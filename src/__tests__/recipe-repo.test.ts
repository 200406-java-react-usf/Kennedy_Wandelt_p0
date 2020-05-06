import { RecipeRepo } from '../repos/recipe-repo';
import * as mockIndex from '..';
import * as mockMapper from '../util/result-set-mapper';
import { Recipe } from '../models/recipe';
import { InternalServerError } from '../errors/errors';

jest.mock('..', ()=> {
    return {
        connectionPool: {
            connect: jest.fn()
        }
    }
});

jest.mock('../util/result-set-mapper', () => {
    return {
        mapRecipeResultSet: jest.fn()
    }
});

describe('recipeRepo', () => {

    let sut = new RecipeRepo();
    let mockConnect = mockIndex.connectionPool.connect;
    let mockRepo;

    
    beforeEach(() => {
        (mockConnect as jest.Mock).mockClear().mockImplementation(() => {
            return {
                query: jest.fn().mockImplementation(() => {
                    return {
                        rows: [
                            {
                                "id": "1",
                                "recipe_name": "recipe",
                                "servings": "1",
                                "total_cals_per_serving": null,
                                "total_carbs_per_serving": null,
                                "total_protien_per_serving": null,
                                "total_fats_per_unit": null
                            }
                        ]
                    }
                }),
                release: jest.fn()
            }
        });
        mockRepo = jest.fn(() => {

            return{
                getAll: jest.fn(),
                getByName: jest.fn(),
                save: jest.fn(),
                deleteByName: jest.fn(),
                update: jest.fn()
            }
        });
        (mockMapper.mapRecipeResultSet as jest.Mock).mockClear();
    });
    

    test('should give an empty array when ther are no records to be retrieved from the data source', async() => {
        expect.hasAssertions();
        //arrange

        (mockConnect as jest.Mock).mockImplementation(() => {
            return {
                query: jest.fn().mockImplementation(() => { return { rows: [] } }),
                release: jest.fn()
            }
        });

        //act
        let result =  await sut.getAll();

        //assert
        expect(result).toBeTruthy();
        expect(result instanceof Array).toBe(true);
        expect(result.length).toBe(0);
        expect(mockConnect).toBeCalledTimes(1);
    });

    test('should give array of Recipes when getAll() fetches from data source', async () => {
        expect.hasAssertions();
        //arrange

        let mockRecipe = new Recipe(1, 'recipe', 1);
        (mockMapper.mapRecipeResultSet as jest.Mock).mockReturnValue(mockRecipe);
        
        //act

        let result = await sut.getAll();

        //assert

        expect(result).toBeTruthy();
        expect(result instanceof Array).toBe(true);
        expect(result.length).toBe(1);
        console.log(typeof(result[0]));
        expect(result[0] instanceof Recipe).toBe(true);
        expect(mockConnect).toBeCalledTimes(1);


    });

    test('should give recipe object when getByName() fetches from data source', async () => {
        expect.hasAssertions();
        //arrange

        let mockRecipe = new Recipe(1, 'recipe', 1);
        (mockMapper.mapRecipeResultSet as jest.Mock).mockReturnValue(mockRecipe);

        //act

        let result = await sut.getByName('recipe');
    
        //assert

        expect(result).toBeTruthy();
        expect(result instanceof Recipe).toBe(true);
        expect(mockConnect).toBeCalledTimes(1);

    });

    

    test('should return new recipe with a valid id when save() adds a new recipe to the data source', async () => {
        expect.hasAssertions();
        //arrange

        let mockInputRecipe = new Recipe(null,'recipe', 1);
        
        //act

        let result = await sut.save(mockInputRecipe)

        //assert

        expect(result).toBeTruthy();
        expect(result instanceof Recipe).toBe(true);
        expect(result.id).toBeTruthy();
        expect(mockConnect).toBeCalledTimes(1);
    });

    test('should return true when delete method is called', async () => {
        expect.hasAssertions();

        (mockConnect as jest.Mock).mockImplementation(() => {
            return {
                query: jest.fn().mockImplementation(() => {return}),
                release: jest.fn()
            }
        });

        let result = await sut.deleteByName('recipe');

        expect(result).toBe(true);
        expect(mockConnect).toBeCalledTimes(1);   
    });

    test('should return updated recipe object when updateRecipe() is called', async () => {
        expect.hasAssertions();

        let mockRecipe = new Recipe(1, 'recipe', 1);
        (mockMapper.mapRecipeResultSet as jest.Mock).mockReturnValue(mockRecipe);

        let result = await sut.update(mockRecipe);

        expect(result).toBeTruthy();
        expect(result instanceof Recipe).toBe(true);
        expect(mockConnect).toBeCalledTimes(1);
    });

    test('should throw 500 error when getAll() query does not return correctly', async() => {
        expect.hasAssertions();

        (mockConnect as jest.Mock).mockImplementation(() => {
            return {
                query: jest.fn().mockImplementation(() => { return false}),
                release: jest.fn()
            }
        });

        try{
            await sut.getAll();
        } catch (e) {
            expect(e instanceof InternalServerError).toBe(true);
        }
    });

    test('should throw 500 error when getByName() query does not return correctly', async() => {
        expect.hasAssertions();

        (mockConnect as jest.Mock).mockImplementation(() => {
            return {
                query: jest.fn().mockImplementation(() => { return false}),
                release: jest.fn()
            }
        });
        let name = 'recipe';
        try{
            await sut.getByName(name);
        } catch (e) {
            expect(e instanceof InternalServerError).toBe(true);
        }
    });

    test('should throw 500 error when save() query does not return correctly', async() => {
        expect.hasAssertions();

        (mockConnect as jest.Mock).mockImplementation(() => {
            return {
                query: jest.fn().mockImplementation(() => { return false}),
                release: jest.fn()
            }
        });
        let mockRecipe = new Recipe(null, 'recipe', 1);
        try{
            await sut.save(mockRecipe);
        } catch (e) {
            expect(e instanceof InternalServerError).toBe(true);
        }
    });
    test('Should return recipe when a new ingredient is added to the recipe ', async() => {
        expect.hasAssertions();
        let mockRecipe = new Recipe(null,'recipe', 1);
        (mockConnect as jest.Mock).mockImplementation(() => {
            return {
                query: jest.fn().mockReturnValueOnce(1).mockReturnValueOnce(1).mockReturnValueOnce(true),
                release: jest.fn()
            }
        });

        mockRepo.getByName = jest.fn().mockReturnValue(mockRecipe);
        

        let result = await sut.addIngredient('recipe', 'ingredient', 1);

        expect(result).toBe(true);
        expect(mockConnect).toBeCalledTimes(1);
    });
});
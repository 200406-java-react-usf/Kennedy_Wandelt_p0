import { IngredientRepo } from '../repos/ingredient-repo';
import * as mockIndex from '..';
import * as mockMapper from '../util/result-set-mapper';
import { Ingredient } from '../models/ingredient';
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
        mapIngredientResultSet: jest.fn()
    }
});

describe('ingredientRepo', () => {

    let sut = new IngredientRepo();
    let mockConnect = mockIndex.connectionPool.connect;

    
    beforeEach(() => {
        (mockConnect as jest.Mock).mockClear().mockImplementation(() => {
            return {
                query: jest.fn().mockImplementation(() => {
                    return {
                        rows: [
                            {
                                "id": "1",
                                "ingredient_name": "ing",
                                "unit": "unit",
                                "calories_per_unit": "100",
                                "carb_grams_per_unit": "1",
                                "protien_grams_per_unit": "2",
                                "fat_grams_per_unit": "3"
                            }
                        ]
                    }
                }),
                release: jest.fn()
            }
        });
        (mockMapper.mapIngredientResultSet as jest.Mock).mockClear();
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

    test('should give array of Ingredients when getAll() fetches from data source', async () => {
        expect.hasAssertions();
        //arrange

        let mockIngredient = new Ingredient(1, 'ing', 'unit', 100, 1, 2, 3);
        (mockMapper.mapIngredientResultSet as jest.Mock).mockReturnValue(mockIngredient);
        
        //act

        let result = await sut.getAll();

        //assert

        expect(result).toBeTruthy();
        expect(result instanceof Array).toBe(true);
        expect(result.length).toBe(1);
        expect(result[0] instanceof Ingredient).toBe(true);
        expect(mockConnect).toBeCalledTimes(1);


    });

    test('should give ingredient object when getByName() fetches from data source', async () => {
        expect.hasAssertions();
        //arrange

        let mockIngredient = new Ingredient(1, 'ing', 'unit', 100, 1, 2, 3);
        (mockMapper.mapIngredientResultSet as jest.Mock).mockReturnValue(mockIngredient);

        //act

        let result = await sut.getByName('ing');
    
        //assert

        expect(result).toBeTruthy();
        expect(result instanceof Ingredient).toBe(true);
        expect(mockConnect).toBeCalledTimes(1);

    });

    

    test('should return new ingredient with a valid id when save() adds a new Ingredient to the data source', async () => {
        expect.hasAssertions();
        //arrange

        let mockInputIngredient = new Ingredient(null,'ing', 'unit', 100, 1, 2, 3);
        
        //act

        let result = await sut.save(mockInputIngredient)
        
        //assert

        expect(result).toBeTruthy();
        expect(result instanceof Ingredient).toBe(true);
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

        let result = await sut.deleteByName('ing');

        expect(result).toBe(true);
        expect(mockConnect).toBeCalledTimes(1);   
    });

    test('should return updated ingredient object when updateIngredient() is called', async () => {
        expect.hasAssertions();

        let mockIngredient = new Ingredient(1,'ing', 'unit', 100, 1, 2, 3);
        (mockMapper.mapIngredientResultSet as jest.Mock).mockReturnValue(mockIngredient);

        let result = await sut.updateIngredient(mockIngredient);

        expect(result).toBeTruthy();
        expect(result instanceof Ingredient).toBe(true);
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
        let name = 'ing';
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
        let mockIngredient = new Ingredient(null,'ing', 'unit', 100, 1, 2, 3);
        try{
            await sut.save(mockIngredient);
        } catch (e) {
            expect(e instanceof InternalServerError).toBe(true);
        }
    });
});
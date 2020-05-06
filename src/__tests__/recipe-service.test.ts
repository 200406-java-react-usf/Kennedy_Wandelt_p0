import { RecipeService } from '../services/recipe-service';
import { RecipeRepo } from '../repos/recipe-repo';
import { Recipe } from '../models/recipe';
import Validator from '../util/validator';
import { DataNotFoundError, BadRequestError, DataSaveError} from '../errors/errors';

jest.mock('../repos/recipe-repo', () => {
    return new class RecipeRepo {
        getAll = jest.fn();
        getByName = jest.fn();
        save = jest.fn();
        deleteByName = jest.fn();
        update = jest.fn();
    }
});

describe('recipeService', () => {
    let sut: RecipeService;
    let mockRepo;

    let mockRecipes = [
        new Recipe(1, 'sandwich', 1, 100, 10, 10, 10),
        new Recipe(2, 'soup', 1, 200, 20, 20, 20),
        new Recipe(3, 'tacos', 1, 300, 30, 30, 30),
        new Recipe(4, 'chicken and rice', 1, 400, 40, 40, 40),
        new Recipe(5, 'salad', 1, 500, 50, 50, 50)
    ];

    beforeEach(() => {

        mockRepo = jest.fn(() => {

            return{
                getAll: jest.fn(),
                getByName: jest.fn(),
                save: jest.fn(),
                deleteByName: jest.fn(),
                update: jest.fn()
            }
        });
        
        sut = new RecipeService(mockRepo);
    });

    test('should resolve to Recipe[] when getAllREcipes() succesfully retrieves users from the data source', async () => {

        //arrange
        expect.hasAssertions()
        mockRepo.getAll = jest.fn().mockReturnValue(mockRecipes)
        //act

        let result = await sut.getAllRecipes();

        //assert\
        expect(result).toBeTruthy();
        expect(result.length).toBe(5);
    });

    test('should reject with DataNotfoundError when getallRecipes fials to get any recipe from the data dource', async() => {
        expect.hasAssertions();
        mockRepo.getAll = jest.fn().mockReturnValue([]);

        try {
            await sut.getAllRecipes();
        } catch (e) {
            expect(e instanceof DataNotFoundError).toBe(true);
        }
    });

    test('should resolve to Recipe when getRecipeByName is given a valid a known name', async() => {
        expect.hasAssertions();
        Validator.isValidString = jest.fn().mockReturnValue(true);

        mockRepo.getByName = jest.fn().mockImplementation((name: string) => {
            return new Promise<Recipe>((resolve) => resolve(mockRecipes[0]));
        });

        Validator.isEmptyObject = jest.fn().mockReturnValue(false);

        let result = await sut.getRecipeByName('sandwich');

        expect(result).toBeTruthy();
        expect(result.id).toBe(1);
        expect(result.name).toBe('sandwich');
    });

    test('should resolve to a bad request error when getRecipeByName is given somehting other than a name ', async() => {
        expect.hasAssertions();
        Validator.isValidString = jest.fn().mockReturnValue(false);

        try {
            await sut.getRecipeByName('');
        } catch (e) {
            expect(e instanceof BadRequestError).toBe(true);
        }
    });

    test('should resolve to a data not found error when getRecipeByName when an invalid name is given', async() => {
        expect.hasAssertions();
        Validator.isValidString = jest.fn().mockReturnValue(true);
        Validator.isEmptyObject = jest.fn().mockReturnValue(true);

        mockRepo.getByName = jest.fn().mockReturnValue({});

        try {
            await sut.getRecipeByName('rice');
        } catch (e) {
            expect(e instanceof DataNotFoundError).toBe(true);
        }
    });

    test('should return new object when a valid object is added to addNewRecipe', async() => {

        expect.hasAssertions();
        Validator.isValidObject=jest.fn().mockReturnValue(true);
        Validator.isEmptyObject=jest.fn().mockReturnValue(true);

        mockRepo.getByName = jest.fn().mockReturnValue({});
        

        mockRepo.save = jest.fn().mockImplementation((recipe: Recipe) => {
            return new Promise<Recipe>((resolve) => resolve(mockRecipes[2]));
        });

        let result = await sut.addNewRecipe({id: null, name: 'soup', servings: 1, totalCals: 300, totalCarbs: 30, totalProtien: 30, totalFats: 30})

        expect(result).toBeTruthy();
        expect(result.id).toBe(3);
        expect(result instanceof Recipe).toBe(true);

    });
    
    test('should return Bad Request error if add newrecipe given an object with null values', async() => {

        expect.hasAssertions();
        Validator.isValidObject=jest.fn().mockReturnValue(false);

        try {
            let result = await sut.addNewRecipe({id: null, name: null, servings: 1, totalCals: 300, totalCarbs: 30, totalProtien: 30, totalFats: 30})
            console.log(result);
        } catch (e) {
            console.log(e)
            expect(e instanceof BadRequestError).toBe(true);
        }
    });

    test('should return DataSaveError if given a conflict', async() => {

        expect.hasAssertions();
        Validator.isValidObject=jest.fn().mockReturnValue(true);
        mockRepo.getByName = jest.fn().mockReturnValue(mockRecipes[4]);
        mockRepo.getRecipeByName = jest.fn().mockReturnValue(mockRecipes[4]);
        
        try{
            await sut.addNewRecipe({id: null, name: 'salad', servings: 1, totalCals: 500, totalCarbs: 50, totalProtien: 50, totalFats: 50})
        } catch (e) {
            expect(e instanceof DataSaveError).toBe(true);
        }
    });

    test('should return true when deleteRecipebyName is given valid Recipe name', async() => {
        expect.hasAssertions();
        Validator.isValidString=jest.fn().mockReturnValue(true);
        mockRepo.deleteByName = jest.fn().mockReturnValue(true);

        let result = await sut.deleteRecipeByName('salad');

        expect(result).toBe(true);   
    });

    test('should return BadRequestError when deleteRecipebyName is given bad string', async() => {
        expect.hasAssertions();
        Validator.isValidString=jest.fn().mockReturnValue(false);

        try{
            await sut.deleteRecipeByName('');
        } catch (e) {
            expect(e instanceof BadRequestError).toBe(true);
        }  
    });

    test('should return new recipe when updateRecipe is given valid Ingredient', async() => {
        expect.hasAssertions();
        Validator.isValidObject = jest.fn().mockReturnValue(true);
        mockRepo.update = jest.fn().mockReturnValue(mockRecipes[4]);

        let result = await sut.updateRecipe(mockRecipes[4]);

        expect(result).toBe(mockRecipes[4]);
        expect(result).toBeTruthy;
        expect(result instanceof Recipe).toBe(true);
    });

    test('should return BadRequestError when updateRecipe is given invalid object', async() => {
        expect.hasAssertions();
        Validator.isValidObject=jest.fn().mockReturnValue(false);

        try{
            await sut.updateRecipe({id: 5, name: 'salad', servings: null, totalCals: 400, totalCarbs: 40, totalProtien: 40, totalFats: 40});
        } catch (e) {
            expect(e instanceof BadRequestError).toBe(true);
        }  
    });

});
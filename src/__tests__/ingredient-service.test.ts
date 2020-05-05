import { IngredientService } from '../services/ingredient-service';
import { IngredientRepo } from '../repos/ingredient-repo';
import { Ingredient } from '../models/ingredient';
import Validator from '../util/validator';
import { DataNotFoundError, BadRequestError, DataSaveError} from '../errors/errors';

jest.mock('../repos/ingredient-repo', () => {
    return new class IngredientRepo {
        getAll = jest.fn();
        getByName = jest.fn();
        save = jest.fn();
        deleteByName = jest.fn();
        updateIngredient = jest.fn();
    }
});

describe('ingredientService', () => {
    let sut: IngredientService;
    let mockRepo;

    let mockIngredients = [
        new Ingredient(1, 'bread', "unit", 100, 10, 10, 10),
        new Ingredient(2, 'egg', "unit", 200, 20, 20, 20),
        new Ingredient(3, 'milk', "cup", 300, 30, 30, 30),
        new Ingredient(4, 'chicken', "oz", 400, 40, 40, 40),
        new Ingredient(5, 'orange', "unit", 500, 50, 50, 50)
    ];

    beforeEach(() => {

        mockRepo = jest.fn(() => {

            return{
                getAll: jest.fn(),
                getByName: jest.fn(),
                save: jest.fn(),
                deleteByName: jest.fn(),
                updateIngredient: jest.fn()
            }
        });
        
        sut = new IngredientService(mockRepo);
    });

    test('should resolve to Ingredietn[] when getAllIngredients() succesfully retrieves users from the data source', async () => {

        //arrange
        expect.hasAssertions()
        mockRepo.getAll = jest.fn().mockReturnValue(mockIngredients)
        //act

        let result = await sut.getAllIngredients();

        //assert\
        expect(result).toBeTruthy();
        expect(result.length).toBe(5);
    });

    test('should reject with DataNotfoundError when getallIngredients fials to get any user from the data dource', async() => {
        expect.hasAssertions();
        mockRepo.getAll = jest.fn().mockReturnValue([]);

        try {
            await sut.getAllIngredients();
        } catch (e) {
            expect(e instanceof DataNotFoundError).toBe(true);
        }
    });

    test('should resolve to Ingredient when getIngredientByName is given a valid a known name', async() => {
        expect.hasAssertions();
        Validator.isValidString = jest.fn().mockReturnValue(true);

        mockRepo.getByName = jest.fn().mockImplementation((name: string) => {
            return new Promise<Ingredient>((resolve) => resolve(mockIngredients[0]));
        });

        Validator.isEmptyObject = jest.fn().mockReturnValue(false);

        let result = await sut.getIngredientByName('bread');

        expect(result).toBeTruthy();
        expect(result.id).toBe(1);
        expect(result.name).toBe('bread');
    });

    test('should resolve to a bad request error when getIngredientByName is given somehting other than a name ', async() => {
        expect.hasAssertions();
        Validator.isValidString = jest.fn().mockReturnValue(false);

        try {
            await sut.getIngredientByName('');
        } catch (e) {
            expect(e instanceof BadRequestError).toBe(true);
        }
    });

    test('should resolve to a data not found error when getIngredientByName when an invalid name is given', async() => {
        expect.hasAssertions();
        Validator.isValidString = jest.fn().mockReturnValue(true);

        mockRepo.getByName = jest.fn().mockImplementation((name: string) => {
            return new Promise<Ingredient>((resolve) => resolve(mockIngredients[0]));
        });

        Validator.isEmptyObject = jest.fn().mockReturnValue(false);

        try {
            await sut.getIngredientByName('');
        } catch (e) {
            expect(e instanceof BadRequestError).toBe(true);
        }
    });

    test('should return new object when a valid object is added to addNewIngredient', async() => {

        expect.hasAssertions();
        Validator.isValidObject=jest.fn().mockReturnValue(true);
        
        mockRepo.getIngredientByName = jest.fn().mockReturnValue(false);
        mockRepo.getByName = jest.fn().mockReturnValue(false);

        mockRepo.save = jest.fn().mockImplementation((ing: Ingredient) => {
            return new Promise<Ingredient>((resolve) => resolve(mockIngredients[2]));
        });

        let result = await sut.addNewIngredient({id: null, name: 'milk', unit: "cup", calories: 300, carbs: 30, protien: 30, fats: 30})

        expect(result).toBeTruthy();
        expect(result.id).toBe(3);
        expect(result instanceof Ingredient).toBe(true);

    });
    
    test('should return Bad Request error if given an object with null values', async() => {

        expect.hasAssertions();
        Validator.isValidObject=jest.fn().mockReturnValue(false);

        try {
            await sut.addNewIngredient({id: null, name: 'milk', unit: "cup", calories: null, carbs: 30, protien: 30, fats: 30})
        } catch (e) {
            expect(e instanceof BadRequestError).toBe(true);
        }
    });

    test('should return DataSaveError if given a conflict', async() => {

        expect.hasAssertions();
        Validator.isValidObject=jest.fn().mockReturnValue(true);
        mockRepo.getByName = jest.fn().mockReturnValue(mockIngredients[4]);
        mockRepo.getIngredientByName = jest.fn().mockReturnValue(mockIngredients[4]);
        
        try{
            await sut.addNewIngredient({id: null, name: 'orange', unit: "unit", calories: 500, carbs: 50, protien: 50, fats: 50})
        } catch (e) {
            expect(e instanceof DataSaveError).toBe(true);
        }
    });

    test('should return true when deleteIngredientbyName is given valid Ingredient name', async() => {
        expect.hasAssertions();
        Validator.isValidString=jest.fn().mockReturnValue(true);
        mockRepo.deleteByName = jest.fn().mockReturnValue(true);

        let result = await sut.deleteIngredientByName('orange');

        expect(result).toBe(true);   
    });

    test('should return BadRequestError when deleteIngredientbyName is given bad string', async() => {
        expect.hasAssertions();
        Validator.isValidString=jest.fn().mockReturnValue(false);

        try{
            await sut.deleteIngredientByName('');
        } catch (e) {
            expect(e instanceof BadRequestError).toBe(true);
        }  
    });

    test('should return new ingredient when updateIngredient is given valid Ingredient', async() => {
        expect.hasAssertions();
        Validator.isValidObject = jest.fn().mockReturnValue(true);
        mockRepo.updateIngredient = jest.fn().mockReturnValue(mockIngredients[4]);

        let result = await sut.updateIngredient(mockIngredients[4]);

        expect(result).toBe(mockIngredients[4]);
        expect(result).toBeTruthy;
        expect(result instanceof Ingredient).toBe(true);
    });

    test('should return BadRequestError when updateIngredient is given invalid object', async() => {
        expect.hasAssertions();
        Validator.isValidObject=jest.fn().mockReturnValue(false);

        try{
            await sut.updateIngredient({id: null, name: 'chicken', unit: "oz", calories: 400, carbs: 40, protien: 40, fats: 40});
        } catch (e) {
            expect(e instanceof BadRequestError).toBe(true);
        }  
    });

});
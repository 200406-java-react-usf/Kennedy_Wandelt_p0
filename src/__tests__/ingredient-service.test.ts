import { IngredientService } from '../services/ingredient-service';
import { IngredientRepo } from '../repos/ingredient-repo';
import { Ingredient } from '../models/ingredient';
import Validator from '../util/validator';
import { DataNotFoundError, BadRequestError} from '../errors/errors';

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

});
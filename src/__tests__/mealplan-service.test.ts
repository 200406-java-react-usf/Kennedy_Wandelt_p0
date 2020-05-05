import { MealPlanService } from '../services/mealplan-service';
import { MealPlanRepo } from '../repos/mealplan-repo';
import { MealPlan } from '../models/mealplan';
import Validator from '../util/validator';
import { DataNotFoundError, BadRequestError, DataSaveError} from '../errors/errors';

jest.mock('../repos/mealplan-repo', () => {
    return new class MealPlanRepo {
        getAll = jest.fn();
        getByName = jest.fn();
        save = jest.fn();
        deleteByName = jest.fn();
        update = jest.fn();
    }
});

describe('mealplanService', () => {
    let sut: MealPlanService;
    let mockRepo;

    let mockPlans = [
        new MealPlan(1, 'plan1', 7),
        new MealPlan(2, 'plan2', 10),
        new MealPlan(3, 'plan3', 7)
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
        
        sut = new MealPlanService(mockRepo);
    });

    test('should resolve to MalPlan[] when getAllPlans() succesfully retrieves users from the data source', async () => {

        //arrange
        expect.hasAssertions()
        mockRepo.getAll = jest.fn().mockReturnValue(mockPlans)
        //act

        let result = await sut.getAllPlans();

        //assert\
        expect(result).toBeTruthy();
        expect(result.length).toBe(3);
    });

    test('should reject with DataNotfoundError when getallPlans fails to get any recipe from the data dource', async() => {
        expect.hasAssertions();
        mockRepo.getAll = jest.fn().mockReturnValue([]);

        try {
            await sut.getAllPlans();
        } catch (e) {
            expect(e instanceof DataNotFoundError).toBe(true);
        }
    });

    test('should resolve to Plans when getPlanByName is given a valid, known name', async() => {
        expect.hasAssertions();
        Validator.isValidString = jest.fn().mockReturnValue(true);

        mockRepo.getByName = jest.fn().mockImplementation((name: string) => {
            return new Promise<MealPlan>((resolve) => resolve(mockPlans[0]));
        });

        Validator.isEmptyObject = jest.fn().mockReturnValue(false);

        let result = await sut.getPlanByName('plan1');

        expect(result).toBeTruthy();
        expect(result.id).toBe(1);
        expect(result.name).toBe('plan1');
    });

    test('should resolve to a bad request error when getPlanByName is given an empty string ', async() => {
        expect.hasAssertions();
        Validator.isValidString = jest.fn().mockReturnValue(false);

        try {
            await sut.getPlanByName('');
        } catch (e) {
            expect(e instanceof BadRequestError).toBe(true);
        }
    });

    test('should resolve to a data not found error when getPlanByName when an invalid name is given', async() => {
        expect.hasAssertions();
        Validator.isValidString = jest.fn().mockReturnValue(true);
        Validator.isEmptyObject = jest.fn().mockReturnValue(true);

        mockRepo.getByName = jest.fn().mockReturnValue({})

        try {
            await sut.getPlanByName('rice');
        } catch (e) {
            expect(e instanceof DataNotFoundError).toBe(true);
        }
    });

    test('should return new object when a valid object is added to addNewRecipe', async() => {

        expect.hasAssertions();
        Validator.isValidObject=jest.fn().mockReturnValue(true);
        
        mockRepo.getPlanByName = jest.fn().mockReturnValue(false);
        mockRepo.getByName = jest.fn().mockReturnValue(false);
        

        mockRepo.save = jest.fn().mockImplementation((recipe: MealPlan) => {
            return new Promise<MealPlan>((resolve) => resolve(mockPlans[0]));
        });
        
        let result = await sut.addNewPlan({id: null, name: 'plan1', length: 7})

        expect(result).toBeTruthy();
        expect(result.id).toBe(1);
        expect(result instanceof MealPlan).toBe(true);

    });
    
    test('should return Bad Request error if add newrecipe given an object with null values', async() => {

        expect.hasAssertions();
        Validator.isValidObject=jest.fn().mockReturnValue(false);

        try {
            await sut.addNewPlan({id: null, name: null, length: 7})
        } catch (e) {
            console.log(e)
            expect(e instanceof BadRequestError).toBe(true);
        }
    });

    test('should return DataSaveError if given a conflict', async() => {

        expect.hasAssertions();
        Validator.isValidObject=jest.fn().mockReturnValue(true);
        mockRepo.getByName = jest.fn().mockReturnValue(mockPlans[2]);
        mockRepo.getPlanByName = jest.fn().mockReturnValue(mockPlans[3]);
        
        try{
            await sut.addNewPlan({id: null, name: 'plan3', length: 7})
        } catch (e) {
            expect(e instanceof DataSaveError).toBe(true);
        }
    });

    test('should return true when deletePlanbyName is given valid Plan name', async() => {
        expect.hasAssertions();
        Validator.isValidString=jest.fn().mockReturnValue(true);
        mockRepo.deleteByName = jest.fn().mockReturnValue(true);

        let result = await sut.deletePlanByName('plan2');

        expect(result).toBe(true);   
    });

    test('should return BadRequestError when deletePlanbyName is given bad string', async() => {
        expect.hasAssertions();
        Validator.isValidString=jest.fn().mockReturnValue(false);

        try{
            await sut.deletePlanByName('');
        } catch (e) {
            expect(e instanceof BadRequestError).toBe(true);
        }  
    });

    test('should return new recipe when updateRecipe is given valid Ingredient', async() => {
        expect.hasAssertions();
        Validator.isValidObject = jest.fn().mockReturnValue(true);
        mockRepo.update = jest.fn().mockReturnValue(mockPlans[0]);

        let result = await sut.updatePlan(mockPlans[0]);

        expect(result).toBe(mockPlans[0]);
        expect(result).toBeTruthy;
        expect(result instanceof MealPlan).toBe(true);
    });

    test('should return BadRequestError when updatePlan is given invalid object', async() => {
        expect.hasAssertions();
        Validator.isValidObject=jest.fn().mockReturnValue(false);

        try{
            await sut.updatePlan({id: 2, name: 'plan2', length: null});
        } catch (e) {
            expect(e instanceof BadRequestError).toBe(true);
        }  
    });

});
import { MealPlanRepo } from '../repos/mealplan-repo';
import * as mockIndex from '..';
import * as mockMapper from '../util/result-set-mapper';
import { MealPlan } from '../models/mealplan';
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
        mapMealPlanResultSet: jest.fn()
    }
});

describe('mealplanRepo', () => {

    let sut = new MealPlanRepo();
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
                                "mealplan_name": "plan",
                                "length": "1"
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
        (mockMapper.mapMealPlanResultSet as jest.Mock).mockClear();
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

    test('should give array of Meal Plans when getAll() fetches from data source', async () => {
        expect.hasAssertions();
        //arrange

        let mockMealPlan = new MealPlan(1, 'plan', 7);
        (mockMapper.mapMealPlanResultSet as jest.Mock).mockReturnValue(mockMealPlan);
        
        //act

        let result = await sut.getAll();

        //assert

        expect(result).toBeTruthy();
        expect(result instanceof Array).toBe(true);
        expect(result.length).toBe(1);
        console.log(typeof(result[0]));
        expect(result[0] instanceof MealPlan).toBe(true);
        expect(mockConnect).toBeCalledTimes(1);


    });

    test('should give mealplan object when getByName() fetches from data source', async () => {
        expect.hasAssertions();
        //arrange

        let mockMealPlan = new MealPlan(1, 'plan', 7);
        (mockMapper.mapMealPlanResultSet as jest.Mock).mockReturnValue(mockMealPlan);

        //act

        let result = await sut.getByName('plan');
    
        //assert

        expect(result).toBeTruthy();
        expect(result instanceof MealPlan).toBe(true);
        expect(mockConnect).toBeCalledTimes(1);

    });

    

    test('should return new meal plan with a valid id when save() adds a new recipe to the data source', async () => {
        expect.hasAssertions();
        //arrange

        let mockInputPlan = new MealPlan(null,'plan', 7);
        
        //act

        let result = await sut.save(mockInputPlan)

        //assert

        expect(result).toBeTruthy();
        expect(result instanceof MealPlan).toBe(true);
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

        let result = await sut.deleteByName('plan');

        expect(result).toBe(true);
        expect(mockConnect).toBeCalledTimes(1);   
    });

    test('should return updated mealplan object when updatePlan() is called', async () => {
        expect.hasAssertions();

        let mockPlan = new MealPlan(1, 'plan', 7);
        (mockMapper.mapMealPlanResultSet as jest.Mock).mockReturnValue(mockPlan);

        let result = await sut.update(mockPlan);

        expect(result).toBeTruthy();
        expect(result instanceof MealPlan).toBe(true);
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
        let name = 'plan';
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
        let mockPlan = new MealPlan(null, "plan", 7);
        try{
            await sut.save(mockPlan);
        } catch (e) {
            expect(e instanceof InternalServerError).toBe(true);
        }
    });
    test('Should return recipe when a new ingredient is added to the recipe ', async() => {
        expect.hasAssertions();
        let mockRecipe = new MealPlan(null,'recipe', 1);
        (mockConnect as jest.Mock).mockImplementation(() => {
            return {
                query: jest.fn().mockReturnValueOnce(1).mockReturnValueOnce(1).mockReturnValueOnce(true),
                release: jest.fn()
            }
        });

        mockRepo.getByName = jest.fn().mockReturnValue(mockRecipe);
        

        let result = await sut.addRecipe('recipe', 'ingredient', 1);

        expect(result).toBeTruthy;
        expect(result instanceof MealPlan).toBe(true);
        expect(mockConnect).toBeCalledTimes(1);
    });
});
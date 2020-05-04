import { IngredientRepo } from '../repos/ingredient-repo';
import * as mockIndex from '..';
import * as mockMapper from '../util/result-set-mapper';
import { Ingredient } from '../models/ingredient';

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
                                "id": 1,
                                "ingredient": "flour tortilla",
                                "unit": "unit",
                                "calories": 140,
                                "carbs": 23,
                                "protien": 3,
                                "fats": 4
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

        let mockIngredient = new Ingredient(1, 'ing', 'unit', 100, 10, 20, 30);
        (mockMapper.mapIngredientResultSet as jest.Mock).mockReturnValue(mockIngredient);
        
        //act

        let result = await sut.getAll();

        //assert

        expect(result).toBeTruthy();
        expect(result instanceof Array).toBe(true);
        expect(result.length).toBe(1);
        expect(mockConnect).toBeCalledTimes(1);


    });
});
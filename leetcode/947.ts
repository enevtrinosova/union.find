// https://leetcode.com/problems/most-stones-removed-with-same-row-or-column/
import {UnionFind} from '../index';

let rowCoordinates = [];
let columnCoordinates = [];

let unionFind;

const getStoneParent = (p, q, index) => {
    const result = {rowCoordinate: rowCoordinates[p], columnCoordinate: columnCoordinates[q]};
    if (result.rowCoordinate === undefined) {
        rowCoordinates[p] = index;
    }

    if (result.columnCoordinate === undefined) {
        columnCoordinates[q] = index;
    }

    return result;
}

const unionStones = (stone, index) => {
    const [p, q] = stone;
    const {rowCoordinate, columnCoordinate} = getStoneParent(p, q, index);

    if (rowCoordinate === undefined && columnCoordinate === undefined) {
        return;
    }

    if (rowCoordinate !== undefined) {
        unionFind.union(rowCoordinate, index);
    }

    if (columnCoordinate !== undefined) {
        unionFind.union(columnCoordinate, index);
    }
}

export const removeStones = (stones: number[][]): number => {
    unionFind = new UnionFind(stones.length);
    stones.forEach((stone, index) => unionStones(stone, index));

    const result = stones.length - unionFind.uniqueGroupsAmount;
    unionFind = null;
    rowCoordinates = [];
    columnCoordinates = [];
    return result;
};

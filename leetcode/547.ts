// https://leetcode.com/problems/number-of-provinces/
import {UnionFind} from '../index';

const findCircleNum = function(isConnected) {
    const isConnectedLength = isConnected.length;
    const unionFind = new UnionFind(isConnectedLength);

    for (let i = 0; i < isConnectedLength; i++) {
        for (let j = i + 1; j < isConnectedLength; j++) {
            if (isConnected[i][j] === 1) {
                unionFind.union(i, j);
            }
        }
    }

    return unionFind.uniqueGroupsAmount;
};

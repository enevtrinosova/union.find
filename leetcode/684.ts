// https://leetcode.com/problems/redundant-connection/
import {UnionFind} from '../index';

const findRedundantConnection = function(edges) {
    const unionFind = new UnionFind(edges.length);
    let redundantConnection = [];

    edges.forEach((edge) => {
        const unionResult = unionFind.union(edge[0], edge[1]);
        if (unionResult) {
            redundantConnection = unionResult;
        }
    })

    return redundantConnection;
};

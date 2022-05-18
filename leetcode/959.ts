// https://leetcode.com/problems/regions-cut-by-slashes/
import {UnionFind} from '../index';

const regionsBySlashes = function(grid): number {
    const rightSlash = '/';
    const leftSlash = '\\';
    const blank = ' ';

    const rowAmount = grid.length + 1;
    const unionLength = rowAmount * rowAmount;
    const unionFind = new UnionFind(unionLength);

    // объединяем края матрицы
    for (let i = 0; i < rowAmount; i++) {
        if (i !== 0 && i !== rowAmount - 1) {
            unionFind.union(0, i * rowAmount);
            unionFind.union(0, i * rowAmount + rowAmount - 1);
            continue;
        }

        for (let j = 0; j < rowAmount; j++) {
            unionFind.union(0, i * rowAmount + j);
        }
    }

    let figures = 0;

    grid.forEach((str, rowIndex) => {
        const strAsArray = str.split('');

        for (let i = 0; i < strAsArray.length; i++) {
            const symbol = strAsArray[i];
            if (symbol === blank) {
                continue;
            }

            const leftTopIndex = rowAmount * rowIndex + i;
            let p;
            let q;

            if (symbol === rightSlash) {
                p = leftTopIndex + 1;
                q = leftTopIndex + rowAmount;
            }

            if (symbol === leftSlash) {
                p = leftTopIndex;
                q = leftTopIndex + rowAmount + 1;
            }

            let isRedundant = unionFind.union(p, q);
            if (isRedundant) {
                figures += 1;
            }
        }
    });

    return figures + 1;
};

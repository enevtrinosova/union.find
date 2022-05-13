export class UnionFind {
    list: number[]; // array of parents of each element
    uniqueGroupsAmount: number; // amount of unique groups
    groupsLength: number[]; // array of length of each group

    constructor(length: number) {
        const newList = [];
        const newGroupsLength = [];

        for (let i = 0; i < length; i++) {
            newList.push(i);
            newGroupsLength.push(1);
        }

        this.list = newList;
        this.groupsLength = newGroupsLength;

        this.uniqueGroupsAmount = length;
    }

    public find(index: number): number {
        let checkedIndex = index;

        while (checkedIndex !== this.list[checkedIndex]) {
            checkedIndex = this.list[checkedIndex];
        }

        const parentIndex = checkedIndex;
        checkedIndex = index;

        while (checkedIndex !== this.list[checkedIndex]) {
            const oldCheckedIndex = checkedIndex;
            this.list[oldCheckedIndex] = parentIndex;
            checkedIndex = this.list[oldCheckedIndex];
        }

        return parentIndex;
    }

    public unionGroups(p: number, q: number): void {
        while (this.list[p] !== this.list[q]) {
            let oldQ = this.list[q];
            this.list[q] = this.list[p];
            q = oldQ;

            this.groupsLength[q] = 0;
        }
    }

    public union(p: number, q: number): void {
        const pParent = this.find(p);
        const qParent = this.find(q);

        if (pParent === qParent) {
            // числа уже в одной группе, не нужно их объединять
            return;
        }

        const pGroupLength = this.groupsLength[pParent];
        const qGroupLength = this.groupsLength[qParent];

        this.uniqueGroupsAmount -= 1;

        if (pGroupLength >= qGroupLength) {
            this.groupsLength[pParent] += this.groupsLength[qParent];
            this.unionGroups(p, q);
            return;
        }

        this.groupsLength[qParent] += this.groupsLength[pParent];
        this.unionGroups(q, p);
    }
}

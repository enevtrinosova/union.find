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

    public union(p: number, q: number): boolean {
        const pParent = this.find(p);
        const qParent = this.find(q);

        if (pParent === qParent) {
            // числа уже в одной группе, не нужно их объединять
            return true;
        }

        const pGroupLength = this.groupsLength[pParent];
        const qGroupLength = this.groupsLength[qParent];

        this.uniqueGroupsAmount -= 1;

        if (pGroupLength >= qGroupLength) {
            this.groupsLength[pParent] += this.groupsLength[qParent];
            this.list[qParent] = pParent;
            this.groupsLength[qParent] = 0;
            return false;
        }

        this.groupsLength[qParent] += this.groupsLength[pParent];
        this.list[pParent] = qParent;
        this.groupsLength[pParent] = 0;

        return false;
    }
}

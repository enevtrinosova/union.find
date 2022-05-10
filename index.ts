class UnionFind {
    list: number[]; // array of parents of each element

    constructor(length: number) {
        const newList = [];
        for (let i = 0; i < length; i++) {
            newList.push(i);
        }

        this.list = newList;
    }

    public union(p: number, q: number): void {
        while (this.list[p] !== this.list[q]) {
            let oldQ = this.list[q];
            this.list[q] = this.list[p];
            q = oldQ;
        }
    }

    public connected(p: number, q: number): boolean {
        const oldP = p;
        while (this.list[p] !== p) {
            p = this.list[p];
        }

        const pParent = this.list[p];
        this.list[oldP] = pParent; // path optimization

        const oldQ = q;
        while (this.list[q] !== q) {
            q = this.list[q];
        }

        const qParent = this.list[q];
        this.list[oldQ] = qParent; // path optimization

        return qParent === pParent;
    }
}

const check = () => {
    const unionFind = new UnionFind(10);

    unionFind.union(0, 2);
    unionFind.union(4, 5);
    unionFind.union(8, 9);
    unionFind.union(0, 1);
    unionFind.union(6, 4);
    unionFind.union(3, 7);
    unionFind.union(7, 9);
    unionFind.union(4, 2);

    console.log(unionFind.connected(3, 9)); // true
    console.log(unionFind.connected(5, 8)); // false
    console.log(unionFind.connected(1, 7)); // false
    console.log(unionFind.connected(2, 6)); // true
};

check();

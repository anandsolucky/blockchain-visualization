class Block {
    constructor(blockId, nounce, data, prevHash = '') {
        this.blockId = blockId
        this.nounce = nounce;
        this.data = data;
        this.prevHash = prevHash;
        this.Hash = this.calculateHash();
    }
    calculateHash() {
        return sha256(this.blockId + this.nounce + JSON.stringify(this.data) + this.prevHash).toString();
    }
}

class BlockChain {
    constructor() {
        this.chain = [this.createGenesisBlock()];

    }
    createGenesisBlock() {
        return new Block(0, 0, "Welcome", "0");
    }
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }
    addBlock(newBlock) {
        newBlock.prevHash = this.getLatestBlock().Hash;
        newBlock.Hash = newBlock.calculateHash();
        if (!(newBlock.Hash.startsWith('000'))) {
            newBlock.nounce = 0;
            while (!(newBlock.Hash.startsWith('000'))) {
                newBlock.nounce++;
                newBlock.Hash = newBlock.calculateHash();
            }
        }
        this.chain.push(newBlock);
    }

    getPrevBlock(block) {
        console.log(block.blockId);
        return this.chain[block.blockId - 1];
    }

    updateBlock(block, data) {
        block.data = data;
        for (var i = block.blockId; i < (this.chain.length - 1); i++) {
            block = this.chain[i];
            block.prevHash = this.chain[i - 1].Hash;
            block.Hash = block.calculateHash();

        }
    }
    updateMinedBlock(block, data, nounce, hashVal) { // Another method to update blockchain with nounce and hash
        block.data = data;
        var myBlock = block.blockId;
        block.nounce = nounce;
        block.Hash = hashVal;
        for (var i = block.blockId; i < (this.chain.length - 1); i++) {
            block = this.chain[i];
            block.prevHash = this.chain[i - 1].Hash;
            if (i != myBlock) {
                block.Hash = block.calculateHash();
            }


        }
    }
}


let DemoBlockChain = new BlockChain();
DemoBlockChain.addBlock(new Block(1, 0, "abc"));
DemoBlockChain.addBlock(new Block(2, 0, "xyz"));
DemoBlockChain.addBlock(new Block(3, 0, "pqr"));
DemoBlockChain.addBlock(new Block(4, 0, "mnp"));


function onLoadFunction() { // This function will be called on page load

    /* Filling up the data value in html from our object */
    first.txt_input.value = DemoBlockChain.chain[1].data;
    second.txt_input.value = DemoBlockChain.chain[2].data;
    third.txt_input.value = DemoBlockChain.chain[3].data;

    /* Filling up the block no value in html from our object */
    first.txt_no.value = DemoBlockChain.chain[1].blockId;
    second.txt_no.value = DemoBlockChain.chain[2].blockId;
    third.txt_no.value = DemoBlockChain.chain[3].blockId;

    /* Filling up the prev hash value in html from our object */
    first.txt_prevHash.value = DemoBlockChain.chain[1].prevHash;
    second.txt_prevHash.value = DemoBlockChain.chain[2].prevHash;
    third.txt_prevHash.value = DemoBlockChain.chain[3].prevHash;

    /* Filling up the Hash value in html from our object */
    first.txt_hash1.value = DemoBlockChain.chain[1].Hash;
    second.txt_hash1.value = DemoBlockChain.chain[2].Hash;
    third.txt_hash1.value = DemoBlockChain.chain[3].Hash;

    /* Filling up the Hash value in html from our object */
    first.txt_nounce.value = DemoBlockChain.chain[1].nounce;
    second.txt_nounce.value = DemoBlockChain.chain[2].nounce;
    third.txt_nounce.value = DemoBlockChain.chain[3].nounce;
}

function calculateHash(form) {      /* This function will called every time we change data values */
    var formVal = getFormVal(form);
    DemoBlockChain.updateBlock(DemoBlockChain.chain[formVal], form.txt_input.value);
    onLoadFunction();
    checkBlockchain(form);
}


function mineBlock(form) {       /* Whenever user clicks on mine button */
    var formVal = getFormVal(form);
    var hashVal = form.txt_hash1.value;
    var dataVal = form.txt_input.value;
    var blockIdVal = form.txt_no.value;
    var prevHashVal = form.txt_prevHash.value;
    var nounceVal = 0;
    if (!(hashVal.startsWith('000'))) {
        while (!(hashVal.startsWith('000'))) {
            nounceVal++;
            hashVal = sha256(blockIdVal + nounceVal + dataVal + prevHashVal);
        }
        DemoBlockChain.updateMinedBlock(DemoBlockChain.chain[formVal], dataVal, nounceVal, hashVal)
        onLoadFunction();
    }
    checkBlockchain(form);
}

function getFormVal(form) {
    if (form.name == "first")
        return 1;
    else if (form.name == "second")
        return 2;
    else
        return 3;
}

function getFormName(val) {
    if (val == 1)
        return "first";
    else if (val == 2)
        return "second";
    else
        return "third";
}

function checkBlockchain(form) {
    var formVal = getFormVal(form);
    for (var i = formVal; i <= 3; i++) {
        var nm = getFormName(i);
        var frm = document.getElementById(nm);
        if (!(((frm).txt_hash1.value).startsWith('000')))
            toggleTableColor(frm, 1);
        else
            toggleTableColor(frm, 2);
    }
}


function toggleTableColor(form, flag) {
    var mytbl = form.getElementsByTagName('table')[0];
    if (flag == 1)
        mytbl.style.backgroundColor = '#ef7f99';
    else
        mytbl.style.backgroundColor = 'lightblue';
}


/* ================= Useful commented stuff ================= 

console.log(DemoBlockChain.chain[1]);
console.log(DemoBlockChain.chain[2]);
console.log(DemoBlockChain.chain[3]);

console.log("\n==== Now Editing block =====\n");
DemoBlockChain.updateBlock(DemoBlockChain.chain[1], "New");  To edit a block we would edit the data field only 
console.log(DemoBlockChain.chain[1]);
console.log(DemoBlockChain.chain[2]);
console.log(DemoBlockChain.chain[3]);

******************************************************/
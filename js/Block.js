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
        if(!(newBlock.Hash.startsWith('000'))){
            newBlock.nounce = 0;
            while(!(newBlock.Hash.startsWith('000'))){
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
        for (var i = block.blockId; i < (this.chain.length ); i++) {
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
        for (var i = block.blockId; i < (this.chain.length); i++) {
            block = this.chain[i];
            block.prevHash = this.chain[i - 1].Hash;
            if (i != myBlock) {
                block.Hash = block.calculateHash();
            }
        }
    }
}

function onLoadFunction() { // This function will be called on page load

    document.getElementById("blockDiv").innerHTML = '';
    for (var j = 0; j < 3; j++) {
        for (var i = 1; i < peerArray[j].chain.length; i++) {
            var blockDiv = document.getElementById("blockDiv");

            frm = document.createElement("form");
            frm.setAttribute("action", "#");
            frm.setAttribute("name", "block" + (i+''+j));
            frm.setAttribute("id", i+''+j);
            frm.setAttribute('class', 'col-xs-7;margin-bottom:30px');
            blockDiv.appendChild(frm);
            
            
            tbl = document.createElement("table");
            tbl.setAttribute("class", "table");
            tbl.setAttribute("style", "background-color:lightblue ; margin-left:30px ");
            tbl.setAttribute("id", "mytbl");
            
            frm.appendChild(tbl);

            // First row of no.
            trw = document.createElement("tr");
            tbl.appendChild(trw);

            thr = document.createElement("th");
            thr.setAttribute("id", "thno");
            thr.innerHTML = "Block No";
            trw.appendChild(thr);

            tdr = document.createElement("td");
            trw.appendChild(tdr);

            txtbno = document.createElement("input");
            txtbno.setAttribute("type", "text");
            txtbno.setAttribute("id", "txt_no" + (i+''+j));
            txtbno.setAttribute("value", peerArray[j].chain[i].blockId);
            txtbno.setAttribute("class", "form-control");
            txtbno.setAttribute("disabled", "");
            tdr.appendChild(txtbno);

            // Second row of nonce..
            trw1 = document.createElement("tr");
            tbl.appendChild(trw1);

            thr1 = document.createElement("th");
            thr1.setAttribute("id", "thnonce");
            thr1.innerHTML = "Nounce";
            trw1.appendChild(thr1);

            tdr1 = document.createElement("td");
            trw1.appendChild(tdr1);

            txtbno1 = document.createElement("input");
            txtbno1.setAttribute("type", "text");
            txtbno1.setAttribute("id", "txt_nounce" + (i+''+j));
            txtbno1.setAttribute("value", peerArray[j].chain[i].nounce);
            txtbno1.setAttribute("class", "form-control");
            tdr1.appendChild(txtbno1);

            //Third row of Prev Hash
            trw2 = document.createElement("tr");
            tbl.appendChild(trw2);

            thr2 = document.createElement("th");
            thr2.setAttribute("id", "thPrevHash");
            thr2.innerHTML = "Prev Hash";
            trw2.appendChild(thr2);

            tdr2 = document.createElement("td");
            trw2.appendChild(tdr2);

            txtbno2 = document.createElement("input");
            txtbno2.setAttribute("type", "text");
            txtbno2.setAttribute("id", "txt_prevHash" + (i+''+j));
            txtbno2.setAttribute("value", peerArray[j].chain[i].prevHash);
            txtbno2.setAttribute("class", "form-control");
            txtbno2.setAttribute("disabled", "");
            tdr2.appendChild(txtbno2);

            //Fourth row of Prev Hash
            trw3 = document.createElement("tr");
            tbl.appendChild(trw3);

            thr3 = document.createElement("th");
            thr3.setAttribute("id", "thData");
            thr3.innerHTML = "Data";
            trw3.appendChild(thr3);

            tdr3 = document.createElement("td");
            trw3.appendChild(tdr3);

            txtbno3 = document.createElement("textarea");
            txtbno3.setAttribute("id", "txt_input" + (i+''+j));
            txtbno3.setAttribute("cols", "20");
            txtbno3.setAttribute("rows", "3");
            txtbno3.setAttribute("onkeyup", "calculateHash(this.form)");
            txtbno3.setAttribute("class", "form-control");
            tdr3.appendChild(txtbno3);
            document.getElementById("txt_input" + (i+''+j)).value = peerArray[j].chain[i].data;

            //Fifth row of Prev Hash
            trw4 = document.createElement("tr");
            tbl.appendChild(trw4);

            thr4 = document.createElement("th");
            thr4.setAttribute("id", "thHash");
            thr4.innerHTML = "Hash";
            trw4.appendChild(thr4);

            tdr4 = document.createElement("td");
            trw4.appendChild(tdr4);

            txtbno4 = document.createElement("input");
            txtbno4.setAttribute("type", "text");
            txtbno4.setAttribute("id", "txt_hash1" + (i+''+j));
            txtbno4.setAttribute("value", peerArray[j].chain[i].Hash);
            txtbno4.setAttribute("class", "form-control");
            txtbno4.setAttribute("disabled", "");
            tdr4.appendChild(txtbno4);

            //Fifth row for mine button
            trw5 = document.createElement("tr");
            tbl.appendChild(trw5);

            thr5 = document.createElement("th");
            thr5.innerHTML = "";
            trw5.appendChild(thr5);

            tdr5 = document.createElement("td");
            trw5.appendChild(tdr5);

            txtbno5 = document.createElement("input");
            txtbno5.setAttribute("type", "button");
            txtbno5.setAttribute("id", "btnMine" + (i+''+j));
            txtbno5.setAttribute("value", "Mine!");
            txtbno5.setAttribute("onclick", "mineBlock(this.form)");
            txtbno5.setAttribute("class", "btn btn-success form-control");
            tdr5.appendChild(txtbno5);
        }
        
    }

}
function fillData(){
    for (var j = 0; j < 3; j++) {
        for (var i = 1; i < peerArray[j].chain.length; i++) {
            document.getElementById('txt_no'+(i+''+j)).value = peerArray[j].chain[i].blockId;
            document.getElementById("txt_nounce" + (i+''+j)).value = peerArray[j].chain[i].nounce;
            document.getElementById("txt_prevHash" + (i+''+j)).value = peerArray[j].chain[i].prevHash;
            document.getElementById("txt_input" + (i+''+j)).value =  peerArray[j].chain[i].data;
            document.getElementById("txt_hash1" + (i+''+j)).value = peerArray[j].chain[i].Hash;
        }
    }
}
function mineBlock(form) {       /* Whenever user clicks on mine button */
    var formVal = getFormVal(form);
    var formVal1 = getFormVal(form).charAt(0);
    var frmName = (form.name).substr(-1);
    var blockIdVal = document.getElementById(formVal).elements.item(0).value;
    var nounceVal = document.getElementById(formVal).elements.item(1).value;
    var prevHashVal = document.getElementById(formVal).elements.item(2).value;
    var dataVal = document.getElementById(formVal).elements.item(3).value;
    var hashVal = document.getElementById(formVal).elements.item(4).value;
	//alert("data: " +  dataVal);
    if(!(hashVal.startsWith('000'))){
        while (!(hashVal.startsWith('000'))) {
            nounceVal++;
            hashVal = sha256(blockIdVal + nounceVal + dataVal + prevHashVal);
        }
        peerArray[frmName].updateMinedBlock(peerArray[frmName].chain[formVal1], dataVal, nounceVal, hashVal)
        fillData();
    }
    checkBlockchain(form);
}

function getFormVal(form) {
    return form.id;
}

function getFormName(val) {
    if (val == 1)
        return "first";
    else if (val == 2)
        return "second";
    else
        return "third";
}

function calculateHash(form) {      /* This function will called every time we change data values */
    var formVal = getFormVal(form);
    var formVal1 = formVal.charAt(0); 
    
    var frmName = (form.name).substr(-1);
    var input = document.getElementById(formVal).elements.item(3).value;
    peerArray[frmName].updateBlock(peerArray[frmName].chain[formVal1], input);
    fillData();
    checkBlockchain(form);
}

function checkBlockchain(form) {
    var formVal = getFormVal(form).charAt(1); 
    var frmName = (form.name).substr(-1);
    for (var i = 1; i < peerArray[frmName].chain.length; i++) {
        //  var nm = getFormName(i);
        var frm = document.getElementById(i+''+formVal);
        //alert(frm.name);
        if (!((document.getElementById(i+''+formVal).elements.item(4).value).startsWith('000')))
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
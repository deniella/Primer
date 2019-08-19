let tbInput = document.getElementById("tbInput").value;
let btnEnter = document.getElementById("btnEnter");

btnEnter.onclick = function(){
  let input = document.getElementById("tbInput").value; //input used to find all prime numbers
  fillQueue(input); //fills queue with total of input
  prime(); //sorts the prime numbers
  document.getElementById('output1').innerHTML = 'Result: ' + Q2.print();
  Q2.empty(); //empties queue
}

// Enables pressing enter in text box to do btnEnter
document.querySelector('#tbInput').addEventListener("keyup", event => {
    if(event.key !== "Enter") return; // Use `.key` instead.
    document.querySelector('#btnEnter').click(); // Things you want to do.
    event.preventDefault(); // No need to `return false;`.
});

//make queue
function queue(){
	this.bottom = null;
	this.top = null;
	this.length = 0;
	this.enqueue = function(_content){ //puts new node at end
    	if (this.bottom == null) { // no nodes
      		this.bottom = new node(_content);
      		this.top = this.bottom;
      		this.length++;
    	}
   		else{ // 1 or more nodes
      		let nodeHold = new node(_content);
      		nodeHold.last = this.top;
      		this.top.next = nodeHold;
      		this.top = nodeHold;
      		this.length++;
    	}
  	}
	this.dequeue = function(){//make dequeue
		if (this.bottom == null) {return null} //no nodes do nothing
		if (this.bottom == this.top){ //one node; remove one
			let nodeHold = this.bottom;
			this.top = null;
			this.bottom = null;
			this.length--;
			return nodeHold.content;
		}
		//more than one node; remove on bottom
			let nodeHold = this.bottom;
			this.bottom = this.bottom.next;
			this.bottom.last = null;
			this.length--;
			return nodeHold.content;
	}
	this.peek = function(){
		if(this.bottom == null){return null;} //look at bottom of stack
			return this.bottom.content;
	}
	this.print = function(){ //print stack from bottom to top
		let nodeHold = this.bottom
		let strOutput = "";
		while(nodeHold != null){
			strOutput += nodeHold.content + "," //holds content in string
			nodeHold = nodeHold.next;
		}
		return strOutput;
	}
	this.empty = function(){ //empty everything in queue
		while(this.bottom != null){
			this.bottom = this.bottom.next;
		}
		this.top = null;
	}
}

//make node
let node = function(_content){
	this.next = null;
	this.last = null;
	this.content = _content;
}

//let input = 40; //input from user will be number

let Q1 = new queue(); 

function fillQueue(_input){//fill q1 from 2 to input
	console.log(1);
	for (let i = 2 ; i <= _input ; i ++){
		//console.log(i);
		Q1.enqueue(i);
	}
}

//fillQueue();

let Q2 = new queue();

console.log("initial q1 stack " + Q1.print());
console.log("initial q1 length " + Q1.length);
console.log(Q1.peek())


function prime(){
	while(Q1.peek() != null){ //while Q1 is not empty
		let x = Q1.dequeue(); //hold value of Q1 after dequeue, subtracts 1 from length
		Q2.enqueue(x); //move to Q2
		let length = Q1.length; //hold current length
		for (let i = 0; i < length; i++){ //iterate and dequeue q1
			let y = Q1.dequeue();
			if(y % x != 0){
				Q1.enqueue(y); //enqueue any numbers not divisible by x
			}
		}
	}
}

//prime();

console.log("q1 " + Q1.print());
console.log("q2 "  + Q2.print());
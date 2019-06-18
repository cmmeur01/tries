class Node {
	constructor() {
		this.children = {};
		this.isTerminal = false;
	}
}

class Trie {
  constructor() {
		this.root = new Node();
	}

	insertRecur(word, root=this.root) {
		let letter = word[0];

		if (!root.children[letter]) {
			root.children[letter] = new Node();
		}

		if (word.length === 1) {
			root.children[letter].isTerminal = true;
		} else {
			this.insertRecur(word.slice(1), root.children[letter]);
		}
	}

	insertIter(word) {
		let node = this.root;
		while(word.length > 0) {
			let letter = word[0];
			if (!node.children[letter]) {
				node.children[letter] = new Node();
			} 
			node = node.children[letter];
			word = word.slice(1);
		}
		node.isTerminal = true;
	}

	searchRecur(word, root=this.root) {
		if (word.length === 0) {
			return (root.isTerminal ? true : false);
		}

		let letter = word[0];

		return (root.children[letter] ? this.searchRecur(word.slice(1), root.children[letter]) : false);
  }
    
	searchIter(word) {
			let node = this.root;

			while(word.length > 0) {
					let letter = word[0];
					
					if(node.children[letter]) {
							node = node.children[letter];
							word = word.slice(1);
					} else {
							return false;
					}
			}	
		return (node.isTerminal ? true : false);	
	}

	wordsWithPrefix(prefix, root = this.root) {	
		if (prefix.length === 0) {
			let allwords = [];
			if (root.isTerminal) allwords.push('');
			for(let ltr in root.children) {
				let child = root.children[ltr];
				this.wordsWithPrefix(prefix, child);
				let suffixes = this.wordsWithPrefix(prefix, child);
				let words = suffixes.map(suf => (ltr + suf));
				allwords.push(...words);
			}
			return allwords;
		} else {
			let firstLtr = prefix[0];
			let child = root.children[firstLtr];

			if (child) {
				let suffixes = this.wordsWithPrefix(prefix.slice(1), root.children[firstLtr]);
				let words = suffixes.map(suf => firstLtr + suf);
				return words;
			} else {
				return [];
			}
		}
	}
		
	startsWith(prefix) {
		let node = this.root;

		while (prefix.length > 0) {
			let ltr = prefix[0];
			if (node.children[ltr]) {
				node = node.children[ltr];
				prefix = prefix.slice(1);
			} else {
				return false;
			}
		}
		return true;
	}
}

let trie = new Trie();
trie.insertIter("apple");
console.log(trie.searchIter("apple")); // true
console.log(trie.searchIter("app")); // false
console.log(trie.startsWith('app')); // true
trie.insertIter('app');
console.log(trie.searchIter("app")); // true

// - Notes application has the following commands:
//     - `createnote <note_content>` - Create a note
//     - `viewnote <note_id>` - View a single note
//     - `deletenote <note_id>` - Delete a single note
//     - `listnotes` - View a formatted list of all the notes taken
//     - `searchnotes <query_string>` - View a formatted list of all the notes that can be identified by the query string
//     - `listnotes, searchnotes` should have a `--limit` parameter for setting the number of items to display in the resulting list
//     - `next` should be invoked to see the next set of data in the current running query
// - Notes can be saved in memory but a database would be preferred (e.g SQLite or Postgres)
// - Create a syncnotes command for automatically synchronising notes with online datastore like Firebase or Parse (`extra credit`)
// - The Notes should be exportable and importable as CSV or JSON.


const readline = require('readline');

// Notes collections
var notes = [];
var i = 1;
var command = "";
var param = "";
var pageL = 1;
var pageS=1;
const io = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Note> '
});

io.prompt();

io.on('line', (line) => {
	//createnote <note one>
	var words = line.trim().split(" ");
	command = words[0];
	
	if((words[1] != null) && (words[1][0]==="<")){
		param = line.substring(line.indexOf("<")+1,line.lastIndexOf(">"));		
	}

	else if((words[1] != null) && (words[1][0]==="-")){
		param = words[1].slice(2);
	}

	switch(command) {
		case 'createnote':
			console.log('created note with ID: ' + createNote(param));
			break;

		case 'listnotes':
			list=true;
			console.log('All Notes in page '+pageL);
			listNotes(param,pageL);

			break;

		case 'viewnotes':
			console.log(viewNote(param));
			break;

		case 'next':
			pageL++;
			pageS++;
			if(list===true){listNotes(param,pageL);
			console.log('All Notes in page '+pageL);}

			else if(list===false){searchNotes(param, pageS);
				console.log('All Notes in page '+pageS);};
			break;

		case 'searchnotes':
			list=false;
			console.log('All Notes in page '+pageS);	
			
		case 'deletenote':
			console.log(deleteNote(param));
			break;
		default:
		console.log("Don't recognize " + line);
		break;
	}
  io.prompt();
}).on('close', () => {
  console.log('Have a great day!');
  process.exit(0);
});


function createNote(content){
	var id = i++;
	notes.push(
		{
			'id' : id,
			'content': content
		}
	);

	return id;
};

function viewNote(id){
	for (var i=0; i<notes.length;i++){
		if(id == notes[i].id){
			return ("......."+notes[i].content); 
		}
	}

};

function listNotes(param,pageL){
	var limit = param;
	for (var i = (pageL-1)*limit; i < limit*pageL; i++) {
		if (i < notes.length) {
			console.log(notes[i].id + ".	" + notes[i].content);
		};
	};
	
};

function searchNotes(param,pageS){
	var limit= words[2].slice(2);
	notes.forEach(notes as note){

	};

	for (var i = (pageL-1)*limit; i < limit*pageL; i++) {
		if (i < notes.length) {
			console.log(notes[i].id + ".	" + notes[i].content);
		};
	};
	
};


function deleteNote(id){
	for (var i=0; i<notes.length;i++){
		if(id == notes[i].id){
			notes.splice(i,1);
			return ("Note deleted succesfully"); 
		}
	}
}
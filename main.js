const showSpinner = () =>{
	document.querySelector('.spinner').classList.add('show');
};
const removeSpinner = () =>{
	document.querySelector('.spinner').classList.remove('show');
};
const addLogoClickListener = () =>{
	document.querySelector('#logo-reload').addEventListener('click', function(){
		location.reload();
	});
};

const generateImageRequest = async (prompt) => {
	try{x
		showSpinner();

		const response = await axios.post('http://localhost:5500/createimage', {
			prompt,
		});

		if(!response.ok){
				console.log(response.data);
				removeSpinner();
				throw new Error('Image could not be generated ');
		}

		document.querySelector('#image').src = response.data;

		removeSpinner();
	}

	catch(e){
			document.querySelector('.text').textContent = e.message;
	}
};

const onSubmit = (e) =>{
	e.preventDefault();
	// AFter submit
	document.querySelector('.text').textContent='';
	document.querySelector('#image').src = '';

	const prompt = document.querySelector('#prompt').innerText;
	if(prompt === ''){
		alert('Please enter some prompt');
		return;
	}

	generateImageRequest(prompt);
};

// event listener for the logo
addLogoClickListener();

// event listener for the form
document.querySelector('#form').addEventListener('submit', onSubmit);
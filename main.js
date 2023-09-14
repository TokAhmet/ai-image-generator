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

	const response = await axios.post('http://localhost:5500/create', {
		prompt,
	});

	console.log(response);
	const data = await response.json();

	const imageUrl = data.data;
	document.querySelector('#image').src = imageUrl;

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
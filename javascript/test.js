const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');

myForm.addEventListener('submit', onSubmit)//we dont have to put function in here we can call it, we can name it

function onSubmit(e)/*take in event parameter*/{
    e.preventDefault();//since it is submit we want to preventDefault
    // console.log(nameInput); // give actual element
    // console.log(nameInput.value); //set to variable by '.value'
    if(nameInput.value ===''|| emailInput.value === ''){
        msg.classList.add('error')
        msg.innerHTML ='Please enter all field'
        // alert('Please enter field')
        setTimeout(()=>msg.remove(), 3000); // setTimeout take in a function, no parameter so do arrow function instead of regular function, first parameter remove the variable from the dom, second parameter take time in milisecond 
    }else{
        // console.log('success')
        const li= document.createElement/*we can create Element out fof nowhere and insert into dom*/('li');
        li.appendChild(document.createTextNode(`${nameInput.value}: ${emailInput.value}`)) //add text node with input value, then need to append li to ul

        userList.appendChild(li) //append li

        //clear the field
        nameInput.value ='';
        emailInput.value='';
    }
}
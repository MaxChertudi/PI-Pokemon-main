
export default function inputsValidation(inputs, checkboxStatus) {
    const regExp_letters = new RegExp(/^[A-Za-z]+$/);
    const regExp_image = new RegExp(/(https:\/\/)([^\s(["<,>/]*)(\/)[^\s[",><]*(.png|.jpg|.jpeg)(\?[^\s[",><]*)?/);
    const regExp_numbers = new RegExp(/^[1-9]+[0-9]*$/);
    const regExp_numbersdecimal = new RegExp(/\+?(\d+(\.(\d+)?)?|\.\d+)/);

    let err = { name: '', image: '', health: '', attack: '', defense: '', speed: '', height: '', weight: '', disabled: true };
    
    if (!regExp_letters.test(inputs.name)) 
        err.name = 'Only letters are allowed !';
    if (!regExp_image.test(inputs.image))
        err.image = 'URL must belong to an image file !';
    if (!regExp_numbers.test(inputs.health))
        err.health = 'Health must be an integer positive number !';
    else
        if (inputs.health > 500)
            err.health = 'Health must be a below 500 !';
    if (!regExp_numbers.test(inputs.attack))
        err.attack = 'Attack must be an integer positive number !';
    else
        if (inputs.attack > 99)
            err.attack = 'Health must be a below 99 !';
    if (!regExp_numbers.test(inputs.defense))
        err.defense = 'Defense must be an integer positive number !';
    else
        if (inputs.defense > 252)
            err.defense = 'Health must be a below 252 !';
    if (!regExp_numbers.test(inputs.speed))
        err.speed = 'Speed must be an integer positive number !';
    else
        if (inputs.speed > 222)
            err.speed = 'Health must be a below 222 !';
    if (!regExp_numbersdecimal.test(inputs.height))
        err.height = 'Height must be a positive number !';
    if (!regExp_numbersdecimal.test(inputs.weight))
        err.weight = 'Weight must be a positive number !';

    // Determine if input fields are good for submit
    const chkbox = checkboxStatus.find( check => check === true);
    let errFree = { name: '', image: '', health: '', attack: '', defense: '', speed: '', height: '', weight: '', disabled: true };
    if (JSON.stringify(err) === JSON.stringify(errFree) && chkbox)
        err.disabled = false;
    else    
        err.disabled = true;
    return err;
}

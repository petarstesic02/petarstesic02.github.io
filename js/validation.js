$(document).ready(function(){

    let counter=0;
    $("#firstName").blur(function(){
        const fNameValid=/^[A-Z][a-z]+$/;
        var fName=document.getElementById("firstName").value;
        console.log(fName);

        if(!(fNameValid.test(fName))){
            $("#errorName").text("Invalid first name.");
            console.log("Ne valja");
            counter++;
            $('#SubmitButton').attr('disabled','disabled');
        }
        else{
            $("#errorName").text("");
            if(counter>0){
                counter--;
            }
        }
    });

    $("#surName").blur(function(){
        const lNameValid=/^[A-Z][a-z]+$/;
        var lName=document.getElementById("surName").value;
        console.log(lName);

        if(!(lNameValid.test(lName))){
            $("#errorName2").text("Invalid last name.");
            console.log("Ne valja");
            counter++;
            $('#SubmitButton').attr('disabled','disabled');
        }
        else{
            $("#errorName2").text("");
            if(counter>0){
                counter--;
            }
        }
    });

    const radio=document.querySelectorAll('[type=radio]');
    radio.forEach(box =>{
        box.addEventListener('click',function(){
            if(document.getElementById("paypalPayment").checked){
                $("#CVV").attr("disabled",true);
                $("#cardNumber").attr("disabled",true);
                $("#cardDate").attr("disabled",true);
            }
            else if(document.getElementById("cardPayment").checked){
                $("#CVV").attr("disabled",false);
                $("#cardNumber").attr("disabled",false);
                $("#cardDate").attr("disabled",false);

                
            }
        });
    });

    $("#cardNumber").blur(function(){
        var cardNumb = document.getElementById('cardNumber').value;
        const cardValid = /^(?:5[1-5][0-9]{14})$/; 
        if(!(cardValid.test(cardNumb))){
            $("#cardNumbError").text("Invalid card number");
            counter++;
            $('#SubmitButton').attr('disabled','disabled');
        }
        else{
            $("#cardNumbError").text('');
            if(counter>0){
                counter--;
            }
        }      
    });

    $("#cardDate").blur(function(){
        var cardNumb = document.getElementById('cardDate').value;
        const mailValid = /^(0[1-9]|1[0-2])\/([0-9]{4}|[0-9]{2})$/;
        if(!(mailValid.test(cardNumb))){
            $("#dateError").text("Invalid card date");
            counter++;
            $('#SubmitButton').attr('disabled','disabled');
        }
        else{
            $("#dateError").text('');
            if(counter>0){
                counter--;
            }
        }      
    });

    $("#CVV").blur(function(){
        var cardNumb = document.getElementById('CVV').value;
        const mailValid = /^[0-9]{3}$/;
        if(!(mailValid.test(cardNumb))){
            $("#CVVError").text("Invalid card CVV");
            counter++;
            $('#SubmitButton').attr('disabled','disabled');
        }
        else{
            $("#CVVError").text('');
            if(counter>0){
                counter--;
            }
        }      
    });

    $("#email").blur(function(){
        var mailCheck = document.getElementById('email').value;
        const mailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 
        if(!(mailValid.test(mailCheck))){
            $("#errorEmail").text("Invalid email");
            counter++;
            $('#SubmitButton').attr('disabled','disabled');
        }
        else{
            $("#errorEmail").text('');
            if(counter>0){
                counter--;
            }
        }      
    });
    
    function checkForm(){
        if((($("#agreement").is(':checked'))&&(counter==0))&&((document.getElementById("paypalPayment").checked)||(document.getElementById("cardPayment").checked)))
        {
            $('#SubmitButton').removeAttr('disabled');
        }
        else
        {
            $('#SubmitButton').attr('disabled','disabled');
        }
    }
    setInterval(checkForm,0001);

});
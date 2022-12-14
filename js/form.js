generate();
$("#cardNumber").hide();
$("#cardDate").hide();
$("#CVV").hide();
let down = document.getElementById("form-div");
function generate(){
    var nameError=document.createElement("span");
        nameError.setAttribute("id","errorName");
    var lNameError=document.createElement("span");
        lNameError.setAttribute("id","errorName2");
    var emailError=document.createElement("span");
        emailError.setAttribute("id","errorEmail");
    var cardNumError=document.createElement("span");
        cardNumError.setAttribute("id","cardNumbError");
    var cardDateError=document.createElement("span");
        cardDateError.setAttribute("id","dateError");
        var cardCVVError=document.createElement("span");
        cardCVVError.setAttribute("id","CVVError");

    var ty = document.createElement("p");
    var message = document.createTextNode("SIGN UP FOR OUR SERVICES");

    var div0= document.createElement("div");
        div0.setAttribute('class','form-group');

    var div1= document.createElement("div");
        div1.setAttribute('class','form-group');
        var divspan1= document.createElement("div");
            divspan1.setAttribute('class','form-group');
        var divspan2= document.createElement("div");
            divspan2.setAttribute('class','form-group');

    var div2= document.createElement("div");
        div2.setAttribute('class','form-group');

    var div3= document.createElement("div");
        div3.setAttribute('class','form-group');
        var divspan4=document.createElement("div");
            divspan4.setAttribute("class","form-group");
        var divspan5=document.createElement("div");
            divspan5.setAttribute("class","form-group");
        var divspan6=document.createElement("div");
            divspan6.setAttribute("class","form-group");

    var div4= document.createElement("div");
        div4.setAttribute('class','form-group');
        var divspan3=document.createElement("div");
            divspan3.setAttribute("class","form-group");

    var div5= document.createElement("div");
        div5.setAttribute('class','form-group');

    var div6= document.createElement("div");
        div6.setAttribute('class','form-group');



    var form = document.createElement("form");
        form.setAttribute("method", "post");
        form.setAttribute("action", "submit.php");

    var fName = document.createElement("input");
        fName.setAttribute("type", "text");
        fName.setAttribute("name", "firstName");
        fName.setAttribute("placeholder", "First Name");
        fName.setAttribute("id","firstName");
        fName.setAttribute("required","required");

    var lName = document.createElement("input");
        lName.setAttribute("type", "text");
        lName.setAttribute("name", "lastName");
        lName.setAttribute("placeholder", "Last Name");
        lName.setAttribute("id","surName");
        lName.setAttribute("required","required");

        var ID = document.createElement("input");
        ID.setAttribute("type", "text");
        ID.setAttribute("name", "emailID");
        ID.setAttribute("placeholder", "E-Mail");
        ID.setAttribute("id","email");
        ID.setAttribute("required","required");

    var paypal = document.createElement("input")
        paypal.setAttribute("type","radio");
        paypal.setAttribute("name","payment");
        paypal.setAttribute("id","paypalPayment");

    var card = document.createElement("input")
        card.setAttribute("type","radio");
        card.setAttribute("name","payment");
        card.setAttribute("id","cardPayment");

    var CVV = document.createElement("input");
        CVV.setAttribute("type", "text");
        CVV.setAttribute("name", "CVV");
        CVV.setAttribute("placeholder", "CVV");
        CVV.setAttribute("id", "CVV");

    var check = document.createElement("input")
        check.setAttribute("type","checkbox");
        check.setAttribute("name","Agreement");
        check.setAttribute("id","agreement");
        check.required;
    var checkLabel = document.createElement("label");
        checkLabel.setAttribute("for","checked");
        var checkLabelText = document.createTextNode("I have read and agree to the Terms Of Service and Privacy Policy.");

    var paypalLabel = document.createElement("label");
        paypalLabel.setAttribute("for","paypal");
        var paypalLabelText = document.createTextNode("Paypal");

    var cardLabel = document.createElement("label");
        cardLabel.setAttribute("for","card");
        var cardLabelText = document.createTextNode("Mastercard");
    

    var cardNum = document.createElement("input");
        cardNum.setAttribute("type", "text");
        cardNum.setAttribute("name", "cardNumber");
        cardNum.setAttribute("placeholder", "Card Number");
        cardNum.setAttribute("id", "cardNumber");
        
    
    var cardDate = document.createElement("input");
        cardDate.setAttribute("type", "text");
        cardDate.setAttribute("name", "cardD");
        cardDate.setAttribute("placeholder", "Expiry Date");
        cardDate.setAttribute("id", "cardDate");

    var s = document.createElement("input");
        s.setAttribute("type", "submit");
        s.setAttribute("value", "Continue");
        s.setAttribute("id", "SubmitButton");
        s.setAttribute("class","btn btn-primary");
        s.setAttribute("disabled","disabled");

        ty.append(message);
        form.append(div0);
        div0.append(ty);
        form.append(div1);
        form.append(divspan1);
        form.append(divspan2);
        form.append(div2);
        form.append(div3);
        form.append(divspan4);
        form.append(divspan5);
        form.append(divspan6);
        form.append(div4);
        form.append(divspan3);
        form.append(div5);
        form.append(div6);
        div1.append(fName);
        divspan1.append(nameError);
        div1.append(lName);
        divspan2.append(lNameError);
        div2.append(card);
        cardLabel.append(cardLabelText);
        div2.append(cardLabel);
        div2.append(paypal);
        paypalLabel.append(paypalLabelText);
        div2.append(paypalLabel);
        div3.append(cardNum);
        div3.append(cardDate);
        div3.append(CVV);
        divspan4.append(cardNumError);
        divspan5.append(cardDateError);
        divspan6.append(cardCVVError);
        div4.append(ID);
        divspan3.append(emailError);
        div5.append(check);
        checkLabel.append(checkLabelText);
        div5.append(checkLabel);
        div6.append(s);
        document.getElementById('form-div').appendChild(form);
}



$("#cardPayment").on("change",function(){
    if($("#cardPayment").is(":checked"))
    {
        $("#cardNumber").show();
        $("#cardDate").show();
        $("#CVV").show();
    }
    else if ($("#paypalPayment").is(":checked"))
    {
        $("#cardNumber").hide();
        $("#cardDate").hide();
         $("#CVV").hide();
    }
});

$("#paypalPayment").on("change",function(){
    if($("#cardPayment").is(":checked"))
    {
        $("#cardNumber").show();
        $("#cardDate").show();
        $("#CVV").show();
    }
    else if ($("#paypalPayment").is(":checked"))
    {
        $("#cardNumber").hide();
        $("#cardDate").hide();
         $("#CVV").hide();
    }
});
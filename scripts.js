const surveyJSON =  {
    "title":"Register Yourself with QuickWork",
    "description":"Register yourself with quickwork, subscribe with newsletter and be updated with QICK WORK transformation.",
    "pages": [
        {
            "name": "page1",
            "elements": [
                {
                    "type": "text",
                    "name": "name",
                    "title": "User Name",
                    "isRequired": true
                },
                {
                    "type": "text",
                    "name": "email",
                    "title": "E-mail-ID",
                    "isRequired": true
                },
                {
                    "type": "radiogroup",
                    "name": "gender",
                    "title": "Gender",
                    "isRequired": true,
                    "choices": [
                        {
                            "value": "male",
                            "text": "Male"
                        },
                        {
                            "value": "female",
                            "text": "Female"
                        },
                        {
                            "value": "transgender",
                            "text": "TransGender"
                        }
                    ]
                },
                {
                    "type": "dropdown",
                    "name": "hobbies",
                    "title": "Hobbies",
                    "isRequired": true,
                    "class":"hobbiesddl",
                    "requiredErrorText": "Something went wrong please try again later",
                    "choicesByUrl": {
                        /* "url": "https://hobbies.saurabhsharma11.repl.co/hobbies",
                        "url":"https://apim.quickwork.co/ayyub/interview/v1/fetchhobbies",headers:{ 'apikey': 'm8bFhVGWZxPG97IZzkLLpUCPNkfPEZQC' },
                        "headers" : {
                            'Content-Type': 'application/json',
                            'apikey': 'm8bFhVGWZxPG97IZzkLLpUCPNkfPEZQC'
                        },
                        "url":URL, */
                        "valueName": "value",
                        "titleName": "value"
                    }
                },
                {
                    "type": "dropdown",
                    /*"name": "playingsubhobbies",
                    "visibleIf": "{hobbies} = 'Playing Chess'",*/
                    "name":"subhobbies",
                    "title": "Playing Sub Category",
                    "choices": [
                        {
                            "visibleIf": "{hobbies} = 'Playing Chess'",
                            "value": "singleplayer",
                            "text": "Single Player"
                        },
                        {
                            "visibleIf": "{hobbies} = 'Playing Chess'",
                            "value": "multiplayer",
                            "text": "Multi Player"
                        },
                        {
                            "visibleIf": "{hobbies} = 'Reading'",
                            "value": "blogs",
                            "text": "Blogs"
                        },
                        {
                            "visibleIf": "{hobbies} = 'Reading'",
                            "value": "articles",
                            "text": "Articles"
                        },
                        {
                            "visibleIf": "{hobbies} = 'Writing'",
                            "value": "newsletter",
                            "text": "News Letter"
                        },
                        {
                            "visibleIf": "{hobbies} = 'Writing'",
                            "value": "content",
                            "text": "Content"
                        }
                    ]
                }
                /*{
                    "type": "dropdown",
                    "name": "readingsubhobbies",
                    "visibleIf": "{hobbies} = 'Reading'",
                    "title": "Reading Sub Category",
                    "choices": [
                        {
                            "value": "blogs",
                            "text": "Blogs"
                        },
                        {
                            "value": "articles",
                            "text": "Articles"
                        }
                    ]
                },
                {
                    "type": "dropdown",
                    "name": "writingsubhobbies",
                    "isRequired": true,
                    "visibleIf": "{hobbies} = 'Writing'",
                    "title": "Writing Sub Category",
                    "choices": [
                        {
                            "value": "newsletter",
                            "text": "News Letter"
                        },
                        {
                            "value": "content",
                            "text": "Content"
                        }
                    ]
                }*/
            ]
        }
    ]
}

var survey = new Survey.Model(surveyJSON);
survey.onComplete.add(sendDataToServer);
$("#surveyContainer").Survey({model:survey});

function sendDataToServer(sender) {
    const urlParams = new URLSearchParams(window.location.search);
    const conversationId = urlParams.get('id');
    var newObject = Object.assign(sender.data,{"conversationId":conversationId});
    console.log(newObject);
    /*var resultAsString = JSON.stringify(sender.data);
    console.log(sender.data);*/

    /*$.ajax({
        //url: "https://apim.quickwork.co/ayyub/interview/v1/submitdata",
        url: "https://apim.quickwork.co/TeamQuickWork/EmployeesCheckpoint/0.0.1/EmployeesCheckpointRegister",
        data: sender.data,
        type: "POST",
        //beforeSend: function(xhr){xhr.setRequestHeader('apikey', 'm8bFhVGWZxPG97IZzkLLpUCPNkfPEZQC');},
        headers:{ 'apikey': 'xIaqHangl6x3JD7X9yEQA0ksrpSi94B3' },
        success: function(data) {
            console.log(data);
            alert("Thank you for registeration. Following is your data : " + resultAsString + ".Please checkin with the QuickworkBot.");
        }
    });*/
}

$(function(){
    $.ajax({
        url: "https://apim.quickwork.co/ayyub/interview/v1/fetchhobbies",
        data: {  },
        type: "GET",
        //beforeSend: function(xhr){xhr.setRequestHeader('apikey', 'm8bFhVGWZxPG97IZzkLLpUCPNkfPEZQC');},
        headers:{'apikey': 'm8bFhVGWZxPG97IZzkLLpUCPNkfPEZQC'},
        success: function(data) {
            var $ddl=$("#sq_103i");
            $ddl.html('');
            $ddl.append("<option value='select'>select</option>")
            for(var i=0;i<data.hobbies.length;i++){
                $ddl.append("<option value='"+ data.hobbies[i].value +"'>"+ data.hobbies[i].value +"</option>")
            }
        }
    });
})
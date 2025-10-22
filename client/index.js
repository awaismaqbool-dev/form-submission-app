const imgInput = document.getElementById('input_image');
fetch("/", {method:"POST", body: "formdata"}).then(res=>res.text()).then(msg=>alert("Form submitted successfully"))
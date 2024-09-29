const form = document.getElementById("contact-form");

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name-input').value;
    const email = document.getElementById('email-input').value;
    const message = document.getElementById('message-input').value;

    const subject = encodeURIComponent("New message from " + name);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    const mailLink = `mailto:tonyngo@utexas.edu?subject=${subject}&body=${body}`;
    window.location.href = mailLink;
});
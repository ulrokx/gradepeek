
<form action="/api/contact" method="POST">
    <div>
        <p>Feel free to leave any comment or concern with the chrome extension here! I will try and get back to you within a few days.</p>
    </div>
    <label for="name">Name</label>
    <input type="text" id="name" name="name">
    <label for="name">Email</label>
    <input type="email" id="email" name="email">
    <label for="name">Message</label>
    <textarea id="message" name="message"></textarea>
    <button type="submit">Send</button>
</form>

<style>
    p {
        font-size: 1.5rem;
        font-weight: 400;
    }
    form {
        margin: 2rem auto;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
        max-width: 500px;
    }

    label {
        font-size: 1.5rem;
        font-weight: 700;
    }

    input:focus, textarea:focus {
        border: 3px solid #f87171;
        outline: none;
    }

    input, textarea {
        font-size: 1.5rem;
        padding: 0.5rem;
        border-radius: 0.5rem;
        border: 1px solid #ef4444;
        transition: border-width 0.1s ease-in-out;
    }
    
    button {
        font-size: 1.5rem;
        font-weight: 700;
        padding: 0.5rem;
        border-radius: 0.5rem;
        border: 1px solid #ef4444;
        background-color: #ef4444;
        color: white;
        transition: border-width 0.1s ease-in-out;
    }

    button:hover {
        border-width: 3px;
    }

</style>
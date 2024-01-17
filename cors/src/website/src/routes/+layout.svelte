<script lang="ts">
    import logo from "$lib/gradepeek.png"
</script>

<nav>
    <ul>
        <li>
            <a href="/"><img src={logo} alt="gradepeek logo" width="64px" height="64px"></a>
        </li>
        <li style="margin-left: auto;">
            <a href="/contact">Contact</a>
        </li>
        <!-- <li>
            <a href="/changelog">Change Log</a>
        </li> -->
    </ul>
</nav>
<slot />

<style>
    nav {
        background-color: #ef4444;
    }
    nav ul {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        list-style: none;
        margin: 0;
        padding-inline: 2rem;
        gap: 2rem;
    }

    li a{
        text-decoration: none;
        color: white;
        font-size: 1.5rem;
        font-weight: 700;
    }
</style>

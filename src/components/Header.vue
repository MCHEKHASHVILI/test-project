<template>
    <header class="bg-grayscale-100 py-6 border-b-1 border-grayscale-200 drop-shadow-[4%]">
        <nav class="wrapper flex justify-between items-center">
            <RouterLink :to="{ name: 'home' }">
                <img src="@/assets/svg/ApplicationLogo.svg" alt="Logo" class="logo" />
            </RouterLink>
            <ul class="flex space-x-4">
                <li>
                    <RouterLink :to="{ name: 'courses' }" class="flex items-center">
                        <img src="@/assets/svg/Stars.svg" alt="Logo"
                            class="w-[21.67px] h-[19.5px] top-[3.25px] left-[2.17px]" />
                        Browse Courses
                    </RouterLink>
                </li>
                <li>
                    Login
                </li>
                <li>
                    Browse Courses
                </li>
            </ul>
        </nav>
    </header>
</template>
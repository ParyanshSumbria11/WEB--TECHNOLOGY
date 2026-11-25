

document.addEventListener("DOMContentLoaded", function () {
    initThemeToggle();
    initMobileMenu();
    initBackToTop();
    initHomeFeatures();
    initFacultyInteractions();
    initGalleryLightbox();
    initLoginSystem();
    initStudentPortal();
    initMarksCalculator();
    initAdmissionForm();
});


function initThemeToggle() {
    const themeBtn = document.getElementById("themeButton");
    const savedTheme = localStorage.getItem("gcetTheme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }

    const updateThemeLabel = () => {
        if (!themeBtn) return;
        const isDark = document.body.classList.contains("dark-mode");
        themeBtn.textContent = isDark ? "Light Mode" : "Dark Mode";
    };

    updateThemeLabel();

    if (themeBtn) {
        themeBtn.addEventListener("click", function () {
            document.body.classList.toggle("dark-mode");
            const isDark = document.body.classList.contains("dark-mode");
            localStorage.setItem("gcetTheme", isDark ? "dark" : "light");
            updateThemeLabel();
        });
    }
}


function initMobileMenu() {
    const menuBtn = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav") || document.querySelector("nav");

    if (menuBtn && mainNav) {
        menuBtn.addEventListener("click", function () {
            mainNav.classList.toggle("open");
            const isOpen = mainNav.classList.contains("open");
            menuBtn.textContent = isOpen ? "✕ Close Menu" : "☰ Menu";
        });
    }
}


function initBackToTop() {
    let backToTopBtn = document.getElementById("backToTopBtn");
    if (!backToTopBtn) {
        backToTopBtn = document.createElement("button");
        backToTopBtn.id = "backToTopBtn";
        backToTopBtn.type = "button";
        backToTopBtn.textContent = "↑ Top";
        document.body.appendChild(backToTopBtn);
    }

    window.addEventListener("scroll", function () {
        if (window.scrollY > 250) {
            backToTopBtn.style.display = "block";
        } else {
            backToTopBtn.style.display = "none";
        }
    });

    backToTopBtn.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}


function initHomeFeatures() {
    const dateTimeEl = document.getElementById("liveDateTime");
    if (dateTimeEl) {
        const updateClock = () => {
            const now = new Date();
            dateTimeEl.textContent = "Current Date & Time: " + now.toLocaleString();
        };
        updateClock();
        setInterval(updateClock, 1000);
    }

    const toggleInfoBtn = document.getElementById("toggleInfoBtn");
    const extraInfoBox = document.getElementById("extraCollegeInfo");
    if (toggleInfoBtn && extraInfoBox) {
        toggleInfoBtn.addEventListener("click", function () {
            extraInfoBox.classList.toggle("visible");
            const isVisible = extraInfoBox.classList.contains("visible");
            toggleInfoBtn.textContent = isVisible ? "Hide College Highlights" : "Show More College Info";
        });
    }
}

function initFacultyInteractions() {
    const facultyCards = document.querySelectorAll(".faculty-card");
    if (facultyCards.length === 0) return;

    facultyCards.forEach(function (card) {
        card.addEventListener("mouseover", function () {
            card.classList.add("highlighted");
        });
        card.addEventListener("mouseout", function () {
            card.classList.remove("highlighted");
        });
    });
}


function initGalleryLightbox() {
    const galleryPhotos = document.querySelectorAll(".gallery-grid .photo");
    const lightbox = document.getElementById("galleryLightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const lightboxCaption = document.getElementById("lightboxCaption");
    const lightboxClose = document.getElementById("lightboxClose");

    if (galleryPhotos.length === 0 || !lightbox) return;

    galleryPhotos.forEach(function (card) {
        card.addEventListener("click", function () {
            const img = card.querySelector("img");
            const caption = card.querySelector("p");
            if (img) {
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                lightboxCaption.textContent = caption ? caption.textContent : img.alt;
                lightbox.classList.add("open");
            }
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener("click", function () {
            lightbox.classList.remove("open");
        });
    }

    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
            lightbox.classList.remove("open");
        }
    });
}

const students = [
    {
        roll: "2512011",
        password: "12345",
        name: "Paryansh Sumbria",
        course: "B.Tech",
        branch: "Computer Science and Engineering (CSE)",
        semester: "Third Semester",
        batch: "2025–2029",
        session: "2026–2027",
        photo: "profile.jpeg",
        percentage: "73.44%",
        totalMarks: "661 / 900",
        status: "Pass",
        credits: "20 / 20",
        coursesCompleted: "9 / 9"
    },
    {
        roll: "2512026",
        password: "12345",
        name: "Aarav Sharma",
        course: "B.Tech",
        branch: "Computer Science and Engineering (CSE)",
        semester: "Third Semester",
        batch: "2025–2029",
        session: "2026–2027",
        photo: "profile.jpeg",
        percentage: "81.20%",
        totalMarks: "731 / 900",
        status: "Pass",
        credits: "20 / 20",
        coursesCompleted: "9 / 9"
    },
    {
        roll: "2512028",
        password: "34567",
        name: "Kabir Singh",
        course: "B.Tech",
        branch: "Information Technology (IT)",
        semester: "Third Semester",
        batch: "2025–2029",
        session: "2026–2027",
        photo: "profile.jpeg",
        percentage: "78.55%",
        totalMarks: "707 / 900",
        status: "Pass",
        credits: "20 / 20",
        coursesCompleted: "9 / 9"
    }
];

function initLoginSystem() {
    const loginBtn = document.getElementById("loginBtn");
    if (!loginBtn) return;

    const loginMessage = document.getElementById("loginMessage");

    loginBtn.addEventListener("click", function () {
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value;

        if (username === "" || password === "") {
            loginMessage.textContent = "Please enter both Roll Number and Password.";
            loginMessage.className = "form-status error";
            return;
        }

        const student = students.find(
            (s) => s.roll === username && s.password === password
        );

        if (student) {
            sessionStorage.setItem("loggedInStudent", JSON.stringify(student));
            loginMessage.textContent = "Login successful! Redirecting to portal...";
            loginMessage.className = "form-status success";
            window.location.href = "student-portal.html";
        } else {
            loginMessage.textContent = "Invalid Roll Number or Password. Please try again.";
            loginMessage.className = "form-status error";
        }
    });
}

function initStudentPortal() {
    if (!document.body.classList.contains("dashboard-page")) return;

    const storedData = sessionStorage.getItem("loggedInStudent");
    if (!storedData) {
        window.location.href = "loginform.html";
        return;
    }

    const student = JSON.parse(storedData);

    const setText = (id, value) => {
        const el = document.getElementById(id);
        if (el && value) el.textContent = value;
    };

    setText("welcomeMessage", "Welcome, " + student.name + "!");
    setText("studentBatchLabel", "BATCH " + student.batch + " · " + student.semester.toUpperCase());
    setText("studentCourseTop", student.course === "B.Tech" ? "Bachelor of Technology" : student.course);
    setText("studentName", student.name);
    setText("studentRoll", student.roll);
    setText("studentCourse", student.course);
    setText("studentBranch", student.branch);
    setText("studentSemester", student.semester);
    setText("studentBatch", student.batch);
    setText("studentSession", student.session);
    setText("resultPercentage", student.percentage);
    setText("resultTotalMarks", student.totalMarks);
    setText("resultStatus", student.status);
    setText("resultCredits", student.credits);
    setText("resultCourses", student.coursesCompleted);

    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            const confirmed = confirm("Are you sure you want to logout?");
            if (confirmed) {
                sessionStorage.removeItem("loggedInStudent");
                window.location.href = "loginform.html";
            }
        });
    }
}


function initMarksCalculator() {
    const calcBtn = document.getElementById("calculateMarksBtn");
    const resetCalcBtn = document.getElementById("resetMarksBtn");
    if (!calcBtn) return;

    const resultBox = document.getElementById("marksResultBox");
    const errorBox = document.getElementById("marksError");

    calcBtn.addEventListener("click", function () {
        const subjectIds = ["sub1", "sub2", "sub3", "sub4", "sub5"];
        let total = 0;

        errorBox.className = "form-status";
        errorBox.textContent = "";

        for (let i = 0; i < subjectIds.length; i++) {
            const rawVal = document.getElementById(subjectIds[i]).value.trim();
            const mark = Number(rawVal);

            if (rawVal === "" || isNaN(mark) || mark < 0 || mark > 100) {
                errorBox.textContent = "Please enter valid marks between 0 and 100 for all 5 subjects.";
                errorBox.className = "form-status error";
                resultBox.classList.remove("visible");
                return;
            }
            total += mark;
        }

        const percentage = (total / 500) * 100;
        let grade = "";

        if (percentage >= 90) {
            grade = "A+ (Outstanding)";
        } else if (percentage >= 80) {
            grade = "A (Excellent)";
        } else if (percentage >= 70) {
            grade = "B (Very Good)";
        } else if (percentage >= 60) {
            grade = "C (Good)";
        } else if (percentage >= 50) {
            grade = "D (Pass)";
        } else {
            grade = "F (Needs Improvement)";
        }

        resultBox.innerHTML =
            "<strong>Total Marks:</strong> " + total + " / 500<br>" +
            "<strong>Percentage:</strong> " + percentage.toFixed(2) + "%<br>" +
            "<strong>Grade:</strong> " + grade;
        resultBox.classList.add("visible");
    });

    if (resetCalcBtn) {
        resetCalcBtn.addEventListener("click", function () {
            ["sub1", "sub2", "sub3", "sub4", "sub5"].forEach(function (id) {
                document.getElementById(id).value = "";
            });
            errorBox.className = "form-status";
            errorBox.textContent = "";
            resultBox.classList.remove("visible");
        });
    }
}

function initAdmissionForm() {
    const admissionForm = document.getElementById("admissionForm");
    if (!admissionForm) return;

    const statusBox = document.getElementById("admissionStatus");
    const resetBtn = document.getElementById("admissionResetBtn");

    const setError = (id, msg) => {
        const el = document.getElementById(id);
        if (el) el.textContent = msg;
    };

    const clearAllErrors = () => {
        ["nameError", "emailError", "phoneError", "genderError", "courseError"].forEach(function (id) {
            setError(id, "");
        });
        statusBox.className = "form-status";
        statusBox.textContent = "";
    };

    admissionForm.addEventListener("submit", function (event) {
        event.preventDefault();
        clearAllErrors();

        const fullName = document.getElementById("fullName").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const course = document.getElementById("course").value;
        const genderSelected = document.querySelector('input[name="gender"]:checked');

        let isValid = true;

        if (fullName.length < 3) {
            setError("nameError", "Please enter your full name (at least 3 characters).");
            isValid = false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setError("emailError", "Please enter a valid email address.");
            isValid = false;
        }

        const phonePattern = /^[0-9]{10}$/;
        if (!phonePattern.test(phone)) {
            setError("phoneError", "Please enter a valid 10-digit mobile number.");
            isValid = false;
        }

        if (!genderSelected) {
            setError("genderError", "Please select your gender.");
            isValid = false;
        }

        if (course === "") {
            setError("courseError", "Please select a course.");
            isValid = false;
        }

        if (isValid) {
            statusBox.textContent = "Admission form submitted successfully for " + fullName + " (" + course + ")!";
            statusBox.className = "form-status success";
        } else {
            statusBox.textContent = "Please fix the highlighted errors above before submitting.";
            statusBox.className = "form-status error";
        }
    });

    if (resetBtn) {
        resetBtn.addEventListener("click", function () {
            admissionForm.reset();
            clearAllErrors();
        });
    }
}
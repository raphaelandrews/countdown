let slideIndex = 1;
showSlides(slideIndex);

document.addEventListener('keydown', function (event) {
    if (event.keyCode == 37) {
        plusSlides(-1)
    }
    else if (event.keyCode == 39) {
        plusSlides(1)
    }
});

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

/*======== COUNTDOWN ========*/
class Timer {
    constructor(root) {
        root.innerHTML = Timer.getHTML();

        this.el = {
            minutes: root.querySelector(".timer__part--minutes"),
            seconds: root.querySelector(".timer__part--seconds"),
            control: root.querySelector(".timer__btn--control"),
            reset: root.querySelector(".timer__btn--reset"),
            zero: root.querySelector(".timer__btn--zero")
        };

        this.interval = null;
        this.remainingSeconds = 0;

        this.el.control.addEventListener("click", () => {
            if (this.interval === null) {
                this.start();
            } else {
                this.stop();
            }
        });

        var inputMinutes = 0;

        this.el.reset.addEventListener("click", () => {
            inputMinutes++

            if (inputMinutes < 60) {
                this.stop();
                this.remainingSeconds = inputMinutes * 60;
                this.updateInterfaceTime();
            }
        });

        this.el.zero.addEventListener("click", () => {
            inputMinutes = 0

            if (inputMinutes < 60) {
                this.el.minutes.style.color = "#fff";
                this.el.seconds.style.color = "#fff";
                this.el.minutes.classList.remove("blink");
                this.el.seconds.classList.remove("blink");
                this.stop();
                this.remainingSeconds = inputMinutes * 60;
                this.updateInterfaceTime();
            }
        });

    }

    updateInterfaceTime() {
        const minutes = Math.floor(this.remainingSeconds / 60);
        const seconds = this.remainingSeconds % 60;

        this.el.minutes.textContent = minutes.toString().padStart(2, "0");
        this.el.seconds.textContent = seconds.toString().padStart(2, "0");
    }

    updateInterfaceControls() {
        if (this.interval === null) {
            this.el.control.classList.add("timer__btn--start");
            this.el.control.classList.remove("timer__btn--stop");
        } else {
            this.el.control.classList.add("timer__btn--stop");
            this.el.control.classList.remove("timer__btn--start");
        }
    }

    start() {
        if (this.remainingSeconds === 0) return;

        this.interval = setInterval(() => {
            this.remainingSeconds--;
            this.updateInterfaceTime();

            if (this.remainingSeconds === 0) {
                this.stop();
            }

            if ((this.remainingSeconds < 20)) {
                this.el.minutes.style.color = "hsl(340, 100%, 50%)";
                this.el.seconds.style.color = "hsl(340, 100%, 50%)";
                this.el.minutes.classList.add("blink");
                this.el.seconds.classList.add("blink");
            }
        }, 1000);

        this.updateInterfaceControls();
    }

    stop() {
        clearInterval(this.interval);

        this.interval = null;

        this.updateInterfaceControls();
    }

    static getHTML() {
        return `
              <span class="timer__part timer__part--minutes">00</span>
              <span class="timer__part">:</span>
              <span class="timer__part timer__part--seconds">00</span>
              <div class="set__timer"><div>
              <button type="button" class="timer__btn timer__btn--control timer__btn--start"></button>
              <button type="button" class="timer__btn timer__btn--reset"></button>
              <button type="button" class="timer__btn timer__btn--zero"></button>
              </div>
          `;
    }
}

new Timer(
    document.querySelector(".timer")
);

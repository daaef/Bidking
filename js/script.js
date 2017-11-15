
$(window).on('load', function () {
    console.clear();

    function CountdownTracker(label, value){

        const el = document.createElement('span');

        el.className = 'flip-clock__piece';
        el.innerHTML = '<b class="flip-clock__card card"><b class="card__top"></b><b class="card__bottom"></b><b class="card__back"><b class="card__bottom"></b></b></b>' +
            '<span class="flip-clock__slot">' + label + '</span>';

        this.el = el;

        const top = el.querySelector('.card__top'),
            bottom = el.querySelector('.card__bottom'),
            back = el.querySelector('.card__back'),
            backBottom = el.querySelector('.card__back .card__bottom');

        this.update = function(val){
            val = ( '0' + val ).slice(-2);
            if ( val !== this.currentValue ) {

                if ( this.currentValue >= 0 ) {
                    back.setAttribute('data-value', this.currentValue);
                    bottom.setAttribute('data-value', this.currentValue);
                }
                this.currentValue = val;
                top.innerText = this.currentValue;
                backBottom.setAttribute('data-value', this.currentValue);

                this.el.classList.remove('flip');
                void this.el.offsetWidth;
                this.el.classList.add('flip');
            }
        }

        this.update(value);
    }

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date());
        return {
            'Total': t,
            'days': Math.floor(t / (1000 * 60 * 60 * 24)),
            'hrs': Math.floor((t / (1000 * 60 * 60)) % 24),
            'min': Math.floor((t / 1000 / 60) % 60),
            'secs': Math.floor((t / 1000) % 60)
        };
    }

    function Clock(countdown,callback) {
        countdown = countdown ? new Date(Date.parse(countdown)) : false;
        callback = callback || function(){};

        const updateFn = getTimeRemaining;

        this.el = document.createElement('div');
        this.el.className = 'flip-clock';

        const trackers = {},
            t = updateFn(countdown);
        let key, timeinterval;

        for ( key in t ){
            if ( key === 'Total' ) { continue; }
            trackers[key] = new CountdownTracker(key, t[key]);
            this.el.appendChild(trackers[key].el);
        }

        let i = 0;

        function updateClock() {
            timeinterval = requestAnimationFrame(updateClock);

            // throttle so it's not constantly updating the time.
            if ( i++ % 10 ) { return; }

            const t = updateFn(countdown);
            if ( t.Total < 0 ) {
                cancelAnimationFrame(timeinterval);
                for ( key in trackers ){
                    trackers[key].update( 0 );
                }
                callback();
                return;
            }

            for ( key in trackers ){
                trackers[key].update( t[key] );
            }
        }

        setTimeout(updateClock,500);
    }

//var deadline = new Date(Date.parse(new Date()) + 12 * 24 * 60 * 60 * 1000);
    const deadline = new Date(Date.parse(new Date(`2017/12/1`)));
    const c = new Clock(deadline, function () { /* Do something when countdouwn is complete */
    });
    const page_timer = document.getElementById('flip_timer');
    page_timer.appendChild(c.el);

    let a = [$('[bid-ctrl="b1"]').attr('count'),
        $('[bid-ctrl="b2"]').attr('count'),
        $('[bid-ctrl="b3"]').attr('count'),
        $('[bid-ctrl="b4"]').attr('count'),];
    $('.parent').each(function () {
        let $this = $(this).find('[count]');
        let $btn = $(this).find('button[bid-ctrl]');
        let i = a.indexOf($this.attr('count'));
        let timer2 = a[i];
        $btn.click(function(){
            if (hours < 1 && minutes < 1 && seconds < 16) {
                timer2 = "00:00:15";
            }
        });
        $btn.mouseover(function () {
           $(this).text("BIDDING STARTS DEC.1")
        });
        $btn.mouseleave(function () {
           $(this).text("BID NOW")
        });
        let hours;
        // // console.log(hours);
        let minutes;
        // // console.log(minutes);
        let seconds;
        // console.log(timer2);
        const interval = setInterval(function () {

            const timer = timer2.split(':');
            //by parsing integer, I avoid all extra string processing
            hours = (parseInt(timer[0], 10));
            // // console.log(hours);
            minutes = parseInt(timer[1], 10);
            // // console.log(minutes);
            seconds = parseInt(timer[2], 10);
            // // console.log(seconds);
            --seconds;
            hours = (minutes < 0) ? --hours : hours;
            hours = `${(hours < 10) ? '0' + hours : hours}`;
            minutes = (seconds < 0) ? --minutes : minutes;
            minutes = (minutes < 0) ? 59 : minutes;
            minutes = `${(minutes < 10) ? '0' + minutes : minutes}`;
            seconds = (seconds < 0) ? 59 : seconds;
            seconds = `${(seconds < 10) ? '0' + seconds : seconds}`;
            if (seconds < 0) {
                seconds = 59;
                if (minutes < 0) {
                    minutes = 59;
                }
            }
            // hours = `${(hours < 10) ? '0' + hours : hours}`;
            // minutes = `${(minutes < 10) ? '0' + minutes : minutes}`;
            // seconds = `${(seconds < 10) ? '0' + seconds : seconds}`;

            if (hours < 1 && minutes < 1 && seconds < 1) {
                // clearInterval(interval);
                hours = "00";
                seconds = "15";
                minutes = "00";
            }
            //minutes = (minutes < 10) ?  minutes : minutes;
            $this.html(`${hours}:${minutes}:${seconds}`);
            timer2 = `${hours}:${minutes}:${seconds}`;
        }, 1000);
    });
});
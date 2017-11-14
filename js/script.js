
$(window).on('load', function () {
    let labels = ['weeks', 'days', 'hrs', 'minutes', 'seconds']
        , nextYear = '2017/12/25'
        , template = _.template($('#main-example-template').html())
        , currDate = '00:00:00:00:00'
        , nextDate = '00:00:00:00:00'
        , parser = /([0-9]{2})/gi
        , $example = $('#main-example');

    // Parse countdown string to an object
    function strfobj(str) {
        var parsed = str.match(parser)
            , obj = {};
        labels.forEach(function (label, i) {
            obj[label] = parsed[i]
        });
        return obj;
    }
    // Return the time components that diffs
    function diff(obj1, obj2) {
        var diff = [];
        labels.forEach(function (key) {
            if (obj1[key] !== obj2[key]) {
                diff.push(key);
            }
        });
        return diff;
    }
    // Build the layout
    var initData = strfobj(currDate);
    labels.forEach(function (label, i) {
        $example.append(template({
            curr: initData[label]
            , next: initData[label]
            , label: label
        }));
    });
    // Starts the countdown
    $example.countdown(nextYear, function (event) {
        var newDate = event.strftime('%w:%d:%H:%M:%S')
            , data;
        if (newDate !== nextDate) {
            currDate = nextDate;
            nextDate = newDate;
            // Setup the data
            data = {
                'curr': strfobj(currDate)
                , 'next': strfobj(nextDate)
            };
            // Apply the new values to each node that changed
            diff(data.curr, data.next).forEach(function (label) {
                var selector = '.%s'.replace(/%s/, label)
                    , $node = $example.find(selector);
                // Update the node
                $node.removeClass('flip');
                $node.find('.curr').text(data.curr[label]);
                $node.find('.next').text(data.next[label]);
                // Wait for a repaint to then flip
                _.delay(function ($node) {
                    $node.addClass('flip');
                }, 50, $node);
            });
        }
    });
    let a = [$('[bid-ctrl="b1"]').attr('count'),
            $('[bid-ctrl="b2"]').attr('count'),
            $('[bid-ctrl="b3"]').attr('count'),
            $('[bid-ctrl="b4"]').attr('count'),];
    $('[bid-ctrl][count]').each(function () {
        let $this = $(this);
        console.log($this);
        let i = a.indexOf($(this).attr('count'));
        let timer2 = a[i];
        console.log(timer2);
        var interval = setInterval(function() {

            var timer = timer2.split(':');
            //by parsing integer, I avoid all extra string processing
            var hours = parseInt(timer[0], 10);
            console.log(hours);
            var minutes = parseInt(timer[1], 10);
            console.log(minutes);
            var seconds = parseInt(timer[2], 10);
            console.log(seconds);
            --seconds;
            hours = (minutes < 0) ? --hours : hours;
            minutes = (seconds < 0) ? --minutes : minutes;
            seconds = (seconds < 0) ? 59 : seconds;
            seconds = `${(seconds < 10) ? '0' + seconds : seconds}`;
            if (hours < 1 && minutes < 1 && seconds < 1){
                // clearInterval(interval);
                hours = "00";
                seconds = "15";
                minutes = "00";
            }
            //minutes = (minutes < 10) ?  minutes : minutes;
            $this.html(`${hours}:${minutes}:${seconds}`);
            timer2 =`${hours}:${minutes}:${seconds}`;
        }, 1000);
    });
});
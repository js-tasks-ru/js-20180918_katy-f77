let calendar = {
    from: new Date('2018-01-01T15:09:10Z'),
    to: new Date('2018-02-01T10:09:10Z')
};

calendar[Symbol.iterator] = function () {

    let current = this.from;
    let last = this.to;

    let calendarIterator = {

        next() {
            
            if (current <= last) {

                current.setDate(current.getDate() + 1);
                
                let date = current.getDate();
                let dayOfWeek = current.getDay();              
                let wrapWithBraces = dayOfWeek === 6 || dayOfWeek === 0;

                let dateString = `${date < 10 ? '0' : ''}${date}`;
                if (wrapWithBraces){

                    dateString = `[${dateString}]`;
                }

                let result = {
                    done: false,
                    value: dateString
                };
                
                return result;

            } else {

                return { done: true };

            }
        }
    };

    return calendarIterator;
};



export default date => {
    const d = new Date(date);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const dtf = new Intl.DateTimeFormat('id-ID', options).format(d);
    return dtf;
}

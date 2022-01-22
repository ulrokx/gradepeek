export const dateDiffDays = (a: Date, b: Date) => {
    const msinday = 1000*60*60*24;
    const atime = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())
    const btime = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate())

    return ((btime - atime) / msinday)
}
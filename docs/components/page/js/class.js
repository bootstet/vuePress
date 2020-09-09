class bootstet {
  constructor (exector) {
    exector(this.reslove, this.reject)
  }
}

new bootstet((reslove, reject) => {
  reslove()
})
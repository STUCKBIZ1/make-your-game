function gameloop(){
    input()
    apdate()
    rander()
    requestAnimationFrame(gameloop)
}
requestAnimationFrame(gameloop)


const CurrentVideo = (video) => {
    return(
        <div className="flex items-center" >
            <div className="me-2 ms-2">
                <img className="h-16 rounded" src="https://i.scdn.co/image/ab67656300005f1f81faf876e87497d089a760d5"></img>
            </div>
            <div className="align-middle">
                <h3>Titre de la vidéo</h3>
                <p>Catégorie</p>
            </div>
        </div>
    )
}

export default CurrentVideo
import {BackgroundImage, DirectoryBody, DirectoryItemContainer} from './directory-item.styles';

const DirectoryItem = ({ category }) => {

    const {imageUrl, title} = category;

    return (
        <DirectoryItemContainer>
        <BackgroundImage style={{
          backgroundImage: `url(${imageUrl})`
        }}/>
        <DirectoryBody>
          <h2> {title} </h2>
          <p> Shop Now</p>
        </DirectoryBody>
      </DirectoryItemContainer>
    )

}

export default DirectoryItem;
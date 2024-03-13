
import withFriendProfile from "../hocs/withFriendProfile";
import withUserProfile from "../hocs/withUserProfile";
import { IProfile } from "../interfaces/IProfile";
import { IProfileId } from "../reducers";
import getImgSrc, { FORMATPNG } from "../utils/getImgSrc";

interface ProfileImageProps extends Pick<IProfile, 'id' | 'testResult' | 'nickname'> {
    showCharacterLabel?: boolean;
    renderLabel?: (id: IProfileId) => React.ReactNode;
};

function ProfileImage({ renderLabel, showCharacterLabel = true, id, nickname, testResult }: ProfileImageProps) {

    const tripCharacter = testResult.tripCharacter;

    return (
        <div className="body--centered">
            <img
                src={getImgSrc('/character', tripCharacter.id, FORMATPNG)}
                alt={nickname}
                className="ProfileImage__image"
            />
            {
                ( renderLabel === undefined )
                    ?
                    <div>
                        <h3 className="typography-label">{ nickname }</h3>
                        {
                            showCharacterLabel 
                            && <p className="typography-note">
                                {tripCharacter.name}
                            </p>
                        }
                    </div>
                    : renderLabel(id)
            }
        </div>
    );
}
export default withFriendProfile(ProfileImage);
const UserProfileImage = withUserProfile(ProfileImage);
export { UserProfileImage };

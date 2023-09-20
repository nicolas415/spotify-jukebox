/**
 * Entity to handle users related data.
 */
export class UsersEntity {
    last_color_set = ''
    userColors = [
        '#ff6666',
        '#ff9864',
        '#ffcb64',
        '#fffe64',
        '#66fee3',
        '#698fdb',
        '#9965fd',
    ]

    /**
     * Gets a color for the next user to register
     */
    getNewUserColor() {
        let color;
        // if it is the first color to be set
        if (!this.last_color_set) {
            color = this.userColors[0]
        }
        const lastColorIndex = this.userColors.indexOf(this.last_color_set)
        // if last color set is the last color of the colors array
        // return the first color of the array
        if (lastColorIndex + 1 === this.userColors.length) {
            color = this.userColors[0]
        }
        // else return the next color of the array
        else {
            color = this.userColors[lastColorIndex + 1]
        }

        this.last_color_set = color
        return color
    }
}

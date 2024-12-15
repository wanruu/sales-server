const COMMIT_REGEX = /^((:[a-z_]+:)|(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]))\s[a-z]+(\(.+\))?: .+$/gm

module.exports = {
    rules: {
        'cz-emoji': [2, 'always'],
    },
    plugins: [
        {
            rules: {
                'cz-emoji': ({ raw }) => {
                    const isValid = COMMIT_REGEX.test(raw)
                    const message = 'Your commit message should be: <emoji> <type>(<scope>)?: <subject>'
                    return [isValid, message]
                }
            }
        }
    ]
}
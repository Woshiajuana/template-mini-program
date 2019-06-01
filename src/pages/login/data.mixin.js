
export default {
    data: {
        isLoading: false,
        formData: {
            LoginName: {
                label: '用户名',
                value: '',
                key: 'formData.LoginName',
                type: 'text',
                placeholder: '用户名',
                nonempty: true,
                use: [
                    {
                        nonempty: true,
                        prompt: '请输入用户名',
                    },
                ],
            },
            Pwd: {
                label: '密码',
                value: '',
                key: 'formData.Pwd',
                type: 'password',
                placeholder: '密码',
                nonempty: true,
                use: [
                    {
                        nonempty: true,
                        prompt: '请输入密码',
                    },
                ],
            },
        }
    }
}

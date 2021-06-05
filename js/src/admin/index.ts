import app from 'flarum/admin/app';

app.initializers.add('clarkwinkelmann-shadow-ban', () => {
    app.extensionData
        .for('clarkwinkelmann-shadow-ban')
        .registerSetting({
            setting: 'clarkwinkelmann-shadow-ban.hideUsers',
            type: 'checkbox',
            label: app.translator.trans('clarkwinkelmann-shadow-ban.admin.setting.hideUsers'),
        })
        .registerPermission({
            icon: 'fas fa-volume-mute',
            label: app.translator.trans('clarkwinkelmann-shadow-ban.admin.permission.ban'),
            permission: 'clarkwinkelmann-shadow-ban.ban',
        }, 'moderate')
        .registerPermission({
            icon: 'fas fa-volume-mute',
            label: app.translator.trans('clarkwinkelmann-shadow-ban.admin.permission.hide'),
            permission: 'clarkwinkelmann-shadow-ban.hide',
        }, 'moderate');
});

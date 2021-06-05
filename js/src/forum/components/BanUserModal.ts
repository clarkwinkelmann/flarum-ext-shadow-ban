import {Vnode} from 'mithril';
import app from 'flarum/forum/app';
import {ComponentAttrs} from 'flarum/common/Component';
import Modal from 'flarum/common/components/Modal';
import Button from 'flarum/common/components/Button';
import User from 'flarum/common/models/User';
import withAttr from 'flarum/common/utils/withAttr';

interface BanUserModalAttrs extends ComponentAttrs {
    user: User
}

// @ts-ignore Modal.view incorrectly type-hinted in Flarum
export default class BanUserModal extends Modal {
    until: string | null = null
    attrs!: BanUserModalAttrs;

    oninit(vnode: Vnode<BanUserModalAttrs, this>) {
        super.oninit(vnode);

        let until = this.attrs.user.attribute('shadowBannedUntil');

        if (until) {
            // If date is in the past behave the same way as if the user wasn't shadow banned
            if (new Date() > new Date(until)) until = null;
        }

        if (until) {
            // @ts-ignore dayjs type-hints not available
            this.until = dayjs(until).toISOString().substring(0, 16); // Remove timezone and seconds for compatibility with datetime-local
        }
    }

    className() {
        return 'ShadowBanUserModal Modal--small';
    }

    title() {
        return app.translator.trans('clarkwinkelmann-shadow-ban.forum.banUser.title', {user: this.attrs.user});
    }

    content() {
        let until = this.attrs.user.attribute('shadowBannedUntil');

        if (new Date() > until) until = null;

        return m('.Modal-body', m('.Form', [
            m('.Form-group', [
                m('label', app.translator.trans('clarkwinkelmann-shadow-ban.forum.banUser.until')),
                m('input.FormControl', {
                    type: 'datetime-local',
                    value: this.until || '',
                    onchange: withAttr('value', (value: string) => {
                        this.until = value || null;
                    }),
                }),
            ]),
            m('.Form-group', [
                m('label', app.translator.trans('clarkwinkelmann-shadow-ban.forum.banUser.quick')),
                Button.component({
                    className: 'Button' + (this.until ? '' : ' active'),
                    onclick: () => {
                        this.until = null;
                    },
                }, app.translator.trans('clarkwinkelmann-shadow-ban.forum.banUser.quickChoiceReset')),
                [1, 2, 7, 30].map(days => {
                    let active: boolean = false;

                    if (this.until) {
                        // @ts-ignore
                        const untilDayjs = dayjs(this.until);
                        // @ts-ignore
                        const from = dayjs().add(days, 'days').subtract(12, 'hours');
                        // @ts-ignore
                        const to = dayjs().add(days, 'days').add(12, 'hours');

                        console.log(days, from, to);

                        active = untilDayjs.isAfter(from) && untilDayjs.isBefore(to);
                    }

                    return Button.component({
                        className: 'Button' + (active ? ' active' : ''),
                        onclick: () => {
                            // @ts-ignore dayjs type-hints not available
                            this.until = dayjs().add(days, 'days').toISOString().substring(0, 16);
                        },
                    }, app.translator.trans('clarkwinkelmann-shadow-ban.forum.banUser.quickChoiceDays', {
                        count: days,
                    }));
                }),
            ]),
            m('.Form-group', Button.component({
                className: 'Button Button--primary',
                loading: this.loading,
                type: 'submit',
            }, app.translator.trans('clarkwinkelmann-shadow-ban.forum.banUser.submit'))),
        ]));
    }

    // @ts-ignore Modal.onsubmit incorrectly type-hinted in Flarum
    onsubmit(event: Event) {
        event.preventDefault();

        this.loading = true;

        this.attrs.user.save({
            shadowBannedUntil: this.until,
        }).then(
            () => this.hide(),
            this.loaded.bind(this)
        );
    }
}

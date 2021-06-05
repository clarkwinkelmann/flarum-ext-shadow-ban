import {extend} from 'flarum/common/extend';
import app from 'flarum/forum/app';
import Button from 'flarum/common/components/Button';
import Badge from 'flarum/common/components/Badge';
import ItemList from 'flarum/common/utils/ItemList';
import Discussion from 'flarum/common/models/Discussion';
import Post from 'flarum/common/models/Post';
import User from 'flarum/common/models/User';
import DiscussionControls from 'flarum/forum/utils/DiscussionControls';
import PostControls from 'flarum/forum/utils/PostControls';
import UserControls from 'flarum/forum/utils/UserControls';
import CommentPost from 'flarum/forum/components/CommentPost';
import BanUserModal from './components/BanUserModal';

app.initializers.add('clarkwinkelmann-shadow-ban', () => {
    extend(DiscussionControls, 'moderationControls', function (items: ItemList, discussion: Discussion) {
        if (!discussion.attribute('canShadowHide')) {
            return;
        }

        const hidden = discussion.attribute('isShadowHidden');

        items.add('shadow-hide', Button.component({
            icon: 'fas fa-volume-mute',
            onclick() {
                discussion.save({
                    isShadowHidden: !hidden,
                }).then(() => {
                    m.redraw();
                });
            },
        }, app.translator.trans('clarkwinkelmann-shadow-ban.forum.discussionControl.' + (hidden ? 'restore' : 'hide'))));
    });

    extend(PostControls, 'moderationControls', function (items: ItemList, post: Post) {
        if (!post.attribute('canShadowHide')) {
            return;
        }

        const hidden = post.attribute('isShadowHidden');

        items.add('shadow-hide', Button.component({
            icon: 'fas fa-volume-mute',
            onclick() {
                post.save({
                    isShadowHidden: !hidden,
                }).then(() => {
                    m.redraw();
                });
            },
        }, app.translator.trans('clarkwinkelmann-shadow-ban.forum.postControl.' + (hidden ? 'restore' : 'hide'))));
    });

    extend(UserControls, 'moderationControls', function (items: ItemList, user: User) {
        if (!user.attribute('canShadowBan')) {
            return;
        }

        items.add('shadow-ban', Button.component({
            icon: 'fas fa-volume-mute',
            onclick() {
                app.modal.show(BanUserModal, {
                    user,
                });
            },
        }, app.translator.trans('clarkwinkelmann-shadow-ban.forum.userControl.ban')));
    });

    extend(User.prototype, 'badges', function (this: User, items: ItemList) {
        const until = this.attribute('shadowBannedUntil');

        if (until && new Date() < new Date(until)) {
            items.add('shadow-banned', Badge.component({
                icon: 'fas fa-volume-mute',
                type: 'shadow-banned',
                label: app.translator.trans('clarkwinkelmann-shadow-ban.forum.badge.user'),
            }));
        }
    });

    extend(Discussion.prototype, 'badges', function (this: Discussion, items: ItemList) {
        if (this.attribute('isShadowHidden')) {
            items.add('shadow-banned', Badge.component({
                icon: 'fas fa-volume-mute',
                type: 'shadow-banned',
                label: app.translator.trans('clarkwinkelmann-shadow-ban.forum.badge.discussion'),
            }));
        }
    });

    extend(CommentPost.prototype, 'elementAttrs', function (this: CommentPost, attrs: any) {
        // @ts-ignore missing type-hint in Flarum
        const {post} = this.attrs;

        if (post.attribute('isShadowHidden')) {
            attrs.className = (attrs.className || '') + ' Post--hidden Post--shadow-hidden';
        }
    });

    extend(CommentPost.prototype, 'headerItems', function (this: CommentPost, items: ItemList) {
        // @ts-ignore missing type-hint in Flarum
        const {post} = this.attrs;

        // Add same button as hidden toggle
        if (post.attribute('isShadowHidden')) {
            items.add('shadow-hidden', m('span.ShadowHiddenPostBadge', app.translator.trans('clarkwinkelmann-shadow-ban.forum.badge.post')));

            if (!items.has('toggle')) {
                items.add(
                    'toggle',
                    Button.component({
                        className: 'Button Button--default Button--more',
                        icon: 'fas fa-ellipsis-h',
                        onclick: this.toggleContent.bind(this),
                    })
                );
            }
        }
    });
});

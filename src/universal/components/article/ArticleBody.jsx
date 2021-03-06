import React from 'react';
import LikeButton from './LikeButton';
import { shareArticle, tweetArticle } from '../../client-api/socialAPI';
import { getAvatarURL, getFullname, getTwitterURL } from '../../helpers/user';

import fbLogo from '../../../../assets/images/fb_blue_40.png';
import twtrLogo from '../../../../assets/images/twitter_blue_40.png';

const ArticleBodyComponent = ({ article, author, user, isLiked, handleLike }) => (
  <div className='article-body container'>

    {/* Author info */}
    <section className='article-body-top flex row-center flex-wrap'>
      <div className='flex row-center flex-expand'>
        <div className='avatar img-cover img-circle'
             style={{backgroundImage: `url(${getAvatarURL(author)})`}}>
        </div>
        <div className='user-details flex-expand m-l-md'>
          <h5 className='m-a-0 text-muted'><span>{getFullname(author)}</span></h5>
          {
            author.twitter &&
              <div className='m-t-sm'>
                <a href={getTwitterURL(author)} className='link-twitter text-truncate'>@{author.twitter}</a>
              </div>
          }
        </div>
      </div>

      {/* Like button */}
      <LikeButton
        user={user}
        isLiked={isLiked}
        article={article}
        handleLike={handleLike} />

    </section>
    <section className='article-content lead'>
      { article.content }
    </section>

    <section className='article-share'>
      <h4 className='text-light small-caps m-b-lg'>Share</h4>
      <div className='icons'>
        <img className='social-icon'
          src={fbLogo}
          onClick={() => shareArticle(article)} />
        <img className='social-icon'
          src={twtrLogo}
          onClick={() => tweetArticle(article)} />
      </div>
    </section>

  </div>
);

export default ArticleBodyComponent;

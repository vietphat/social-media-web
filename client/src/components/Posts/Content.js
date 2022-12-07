import { useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronRight, faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons';

import styles from './Content.module.scss';

const cx = classNames.bind(styles);

const Content = ({ mediaUrls }) => {
    const [showIndex, setShowIndex] = useState(0);

    function checkImageURL(url) {
        return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
    }

    const handlePrevButton = (e) => {
        setShowIndex((prev) => {
            if (showIndex === 0) {
                prev = mediaUrls.length - 1;
            } else {
                prev--;
            }
            return prev;
        });
    };

    const handleNextButton = (e) => {
        setShowIndex((prev) => {
            if (showIndex === mediaUrls.length - 1) {
                prev = 0;
            } else {
                prev++;
            }
            return prev;
        });
    };

    let display;
    if (checkImageURL(mediaUrls[showIndex])) {
        display = <img src={mediaUrls[showIndex]} alt={`media-${mediaUrls[showIndex]}`} className={cx('post-image')} />;
    } else {
        display = <video controls src={mediaUrls[showIndex]} className={cx('post-video')} />;
    }

    return (
        <div className={cx('content')}>
            {showIndex !== 0 && (
                <FontAwesomeIcon onClick={handlePrevButton} className={cx('left-btn')} icon={faCircleChevronLeft} />
            )}
            {display}
            {showIndex !== mediaUrls.length - 1 && (
                <FontAwesomeIcon onClick={handleNextButton} className={cx('right-btn')} icon={faCircleChevronRight} />
            )}
        </div>
    );
};

export default Content;

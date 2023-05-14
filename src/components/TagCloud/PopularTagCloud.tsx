import '../TagCloud/cloud-tag-styles.css';
import { FC, useEffect } from 'react';
import { TagCloud } from 'react-tagcloud';
import { Box, Tab, Tabs, useMediaQuery } from '@mui/material';
import { Text } from '../Common/Text';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hook/redux';
import { getMostPopularTags } from '../../state/actions/mainActions';
import { RootState } from '../../state';
import { setSearchTags } from '../../state/slices/main.slice';
import { TagChip } from '../Common/TagChip';
import { TagType } from '../../models/IItem';
import { useTranslation } from 'react-i18next';
import { shades } from '../../theme';

interface CloudTag {
    value: string;
    count: number;
    key: number;
}

export const PopularTagCloud: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { tagCounts } = useAppSelector((state: RootState) => state.main);
    const tags = useAppSelector((state: RootState) => state.items.tags);
    const { t } = useTranslation('translation', {
        keyPrefix: 'home',
    });
    useEffect(() => {
        dispatch(getMostPopularTags());
    }, [dispatch]);

    const getTagNameById = (tagId: number) => {
        return tags.find((tag) => tag.id === tagId)?.name;
    };
    const isNonMobile = useMediaQuery('(min-width:600px)');

    const formatTagCounts: CloudTag[] = tagCounts.map((tagCount) => ({
        count: tagCount.count,
        value: getTagNameById(tagCount.tagId) || '',
        key: tagCount.tagId,
    }));

    const customRenderer = (tag: CloudTag, size: number, color: string) => {
        if (tag.value) {
            return (
                <span
                    key={tag.key}
                    className='cloud-tag scale'
                    style={{
                        animationDelay: `${Math.random() * 2}s`,
                        fontSize: `${size}px`,
                        color: `${color}`,
                    }}>
                    {tag.value}
                </span>
            );
        } else return <span key={tag.key}></span>;
    };

    const onTagClick = (tag: CloudTag) => {
        navigate('/');
        dispatch(setSearchTags([{ id: tag.key, name: tag.value }]));
    };

    return (
        <>
            <Tabs
                textColor='primary'
                indicatorColor='primary'
                value='popularTags'
                centered
                TabIndicatorProps={{
                    sx: { display: 'none' },
                }}
                sx={{
                    m: '15px',
                    '& .MuiTabs-flexContainer': { flexWrap: 'wrap' },
                }}>
                <Tab label='POPULAR TAGS' value='popularTags' />
            </Tabs>
            <Box width='80%' m='0px auto'>
                <TagCloud
                    className='text-center'
                    minSize={12}
                    maxSize={24}
                    colorOptions={{
                        luminosity: 'light',
                        hue: `${shades.secondary[100]}`,
                    }}
                    tags={formatTagCounts}
                    onClick={onTagClick}
                    renderer={customRenderer}
                    shuffle={false}
                />
            </Box>
        </>
    );
};

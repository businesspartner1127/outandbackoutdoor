import {Button, FormControl, LinearProgress, Typography} from "@material-ui/core";
import React, {useEffect, useState} from 'react'

import CheckIcon from '@material-ui/icons/Check';
import ReplayIcon from '@material-ui/icons/Replay';
import _data from "./data.json";
import axios from "axios";

const getResults = async (payload) => {
    return await axios.post(
        `https://external.oboit.net/api/product/structured_search`,
        payload,
        {
            headers: {
                'X-OBO-SUPPORT-SECRET': '1ce2a44f-28cc-415a-92ad-6be2d352ac88'
            }
        }
    ) 
}

const productFetch = async (product_ids) => {
    return await axios.get(
        `https://out-and-back-outdoor.myshopify.com/admin/api/2021-10/products.json?ids=${product_ids}&fields=id,title,vendor,handle,images,variants`,
        {
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Access-Token': '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'
            }
        }
    ) 
}

const filterResultsFunc = (results) => {
    return results.results.map(product => product.product_id).join()
}


const Title = ({children}) => {
    return (
        <Typography variant="h4" gutterBottom className='Title'>
            {children}
        </Typography>
    )
}

const Subtitle = ({children}) => {
    return (
        <Typography variant="h6" gutterBottom className='Title'>
            {children}
        </Typography>
    )
}

const ProductItem = ({title, vendor, handle, images, variants}) => {
    const price = variants.map(variant => variant.price).sort()[0]

    const handleClick = () => {
        window.location.href = `/products/${handle}`
    }

    return (
       
         <div className='ProductItem__Container' onClick={handleClick}> 
            <div className='Img__Container'>
                { images.length > 0 ? 
                    <img src={images[0].src} alt="Product"/>
                :
                    <img src={`https://cdn.shopify.com/s/files/1/0412/7840/6813/files/no_image_available.png?v=1640289189`} alt="Product"/>
                }
            </div>

            <span className='Name'>{title}</span>
            <span className='Brand'>{vendor}</span>
            <span className='Price'>
                <span className='To'>from ${price}</span>
            </span>
            <span className='Sale'>SALE</span>
        </div>
    )
}

const ButtonFooter = ({okButtonDisabled, onComplete}) => {
    return (
        <div className='ButtonFooter__Container'>
            <Button variant="contained" color="secondary" onClick={onComplete} endIcon={<CheckIcon/>} disabled={okButtonDisabled}>
                OK
            </Button>
        </div>
    )
}

const TextBridge = ({children}) => {
    return <div className='TextBridge FadeIn'>{children}</div>
}

const useTextBridge = (handler) => {
    const [show, setShow] = React.useState(false);
    const start = () => {
        setShow(true)
        setTimeout(() => {
            handler()
            setShow(false)
        }, 700)
    }

    return {show, start}
}

const Result = ({data, isLoading}) => {
    const renderLoading = () => {
        return (
            <div>
                <p>Getting your results...</p>
                <LinearProgress/>
            </div>
        )
    }

    return (
        <div className='Results__Container'>
            {isLoading && renderLoading()}
            {!isLoading && data?.length ? (
                <>
                    <Title>#BOOM</Title>
                    <div className='Products'>
                        {data?.map((p, idx) => {
                            return <ProductItem {...p} key={idx}/>
                        })}
                    </div>
                </>
            ) : null}
            {!isLoading && !data?.length && (
                <>
                    <Title>Oops!</Title>
                    <div className='Products'>
                        <h2>Couldn't fetch your results</h2>
                    </div>
                </>
            )}
        </div>
    )
}

const Step = (props) => {
    const {text, answers, onNextQuestion, subTitle, acceptedAnswers} = props;

    const [answer, setAnswer] = useState({text: ''});
    const [multipleAnswers, setMultipleAnswers] = useState(answers);
    const selectedCount = multipleAnswers.filter((i) => !!i.checked).length
    const isValid = acceptedAnswers === 1 ? answer?.text : !!multipleAnswers.find((a) => !!a.checked)

    const handleComplete = async () => {
        if (acceptedAnswers === 1) onNextQuestion([answer])
        if (acceptedAnswers > 1) {
            onNextQuestion(multipleAnswers.filter(({checked}) => !!checked))
            setMultipleAnswers([])
        }

        setAnswer({text: ''})
    }

    const {start, show} = useTextBridge(handleComplete)

    const getTransitionText = () => {
        if (acceptedAnswers === 1) return answer.transitionText;
        if (selectedCount === 1) return multipleAnswers[0].transitionText;
        return multipleAnswers[0].transitionTextMultiple;
    }


    const getAnswer = (text) => {
        return answers.find((a) => a.text === text)
    }

    const handleChange = (value) => {
        setAnswer(getAnswer(value));
    };


    const handleChangeMultiple = (value, checked) => {
        if (selectedCount === acceptedAnswers && checked) return;

        const newMultipleAnswers = multipleAnswers.map((ma) => {
            if (value === ma.text) {
                return {...ma, checked}
            }

            return {...ma}
        })

        setMultipleAnswers(newMultipleAnswers);
    };

    const getSelectContent = (index, isSelected) => {
        const alpha = Array.from(Array(26)).map((e, i) => i + 65);
        const alphabet = alpha.map((x) => String.fromCharCode(x));
        return isSelected ? <CheckIcon/> : alphabet[index]
    }


    const isMultipleAnswerSelected = (_text) => {
        return !!multipleAnswers.find(({text, checked}) => text === _text && checked)
    }

    const getAnswers = () => {
        if (acceptedAnswers === 1) {
            return (
                <div className={`Answers__Container ${answers?.length > 7 ? 'Answer__Container--wrap' : ''}`}>
                    {answers.map((a, idx) => {
                        const isSelected = a.text === answer.text;
                        return (
                            <div className={`Answer__Item ${isSelected ? 'Answer__Item--selected' : ''}`} onClick={() => {
                                handleChange(a.text)
                            }}>
                                <span className='Answer__Check'>{getSelectContent(idx, isSelected)}</span>
                                <span>{a.text}</span>
                            </div>
                        )
                    })}
                </div>
            )
        }


        return (
            <div className='Answers__Container Answer__Container--wrap'>
                {answers.map((a, idx) => {
                    const isSelected = isMultipleAnswerSelected(a.text);
                    return (
                        <div className={`Answer__Item ${isSelected ? 'Answer__Item--selected' : ''}`} onClick={() => {
                            handleChangeMultiple(a.text, !isSelected)
                        }}>
                            <span className='Answer__Check'>{getSelectContent(idx, isSelected)}</span>
                            <span>{a.text}</span>
                        </div>
                    )
                })}
            </div>
        )
    }

    useEffect(() => {
        setMultipleAnswers(answers)
    }, [answers])

    return show ? <TextBridge>{getTransitionText()}</TextBridge> : (
        <div className='Step__Container  SlideRightToLeft'>
            <Title>{text}</Title>
            <Subtitle>{subTitle}</Subtitle>
            {getAnswers()}
            <ButtonFooter  {...props} okButtonDisabled={!isValid} onComplete={start}/>
        </div>
    )
}


const Data = {
    "products": [{
        "brand": "The North Face",
        "collection_ids": [233986883741, 233987178653, 233987211421, 235832606877, 236153503901, 265040527517, 266304127133, 281905397917, 283518271645, 283963293853, 283965784221, 283967586461, 284054814877, 284278522013, 284279013533, 284279505053, 284280127645, 284405858461],
        "images": [{"url": "//cdn.shopify.com/s/files/1/0412/7840/6813/products/surgent-pants-mens-1.jpg?v=1611267596"}],
        "metafields": [{"key": "brand_sku", "value": "AKVK", "value_type": "String"}, {"key": "brand_image_source", "value": "REI", "value_type": "String"}, {
            "key": "brand_image_url",
            "value": "<a href=\"https://www.rei.com/rei-garage/product/873522/the-north-face-surgent-pants-mens\">https://www.rei.com/rei-garage/product/873522/the-north-face-surgent-pants-mens</a>",
            "value_type": "String"
        }, {"key": "google_product_category", "value": "204", "value_type": "String"}],
        "options": {"color": "grey:grey", "site_and_condition": "The North Face Renewed:used", "size": "xxl"},
        "presented_variant_id": null,
        "product_id": 5998496088221,
        "tags": ["-auto-color-gray:gray", "-auto-color-grey:grey", "-auto-condition-new", "-auto-condition-used", "-auto-size-xl", "-auto-size-xxl", "Active Pants", "Bottoms", "Casual", "Fitness", "Fleece", "Joggers", "Men's", "Outerwear", "Pants"],
        "title": "Men's Surgent Pants",
        "url_slug": "mens-surgent-pants",
        "variants": [{"msrp": 50.0, "price": 25.0, "sku": "6585660670001", "variant_id": 41367017423005}, {"msrp": 50.0, "price": 59.95, "sku": "v1-133923774977-0", "variant_id": 41367017455773}]
    }, {
        "brand": "Columbia",
        "collection_ids": [233987178653, 233987211421, 235833098397, 236153503901, 236939051165, 265040527517, 278696689821, 281905430685, 281905725597, 283963293853, 283965685917, 283965751453, 283965849757, 284054814877, 284278522013, 284279013533, 284279505053, 284280127645, 284405858461],
        "images": [{"url": "//cdn.shopify.com/s/files/1/0412/7840/6813/products/snow-gun-pants-mens-1.jpg?v=1611279916"}, {"url": "//cdn.shopify.com/s/files/1/0412/7840/6813/products/snow-gun-pants-mens-2.jpg?v=1611279916"}],
        "metafields": [{"key": "brand_sku", "value": "120446", "value_type": "String"}, {"key": "brand_image_source", "value": "REI", "value_type": "String"}, {
            "key": "brand_image_url",
            "value": "<a href=\"https://www.rei.com/product/120446/columbia-snow-gun-pants-mens\">https://www.rei.com/product/120446/columbia-snow-gun-pants-mens</a>",
            "value_type": "String"
        }, {"key": "google_product_category", "value": "204", "value_type": "String"}],
        "options": {"color": "gray:gray", "site_and_condition": "Poshmark:used", "size": "l"},
        "presented_variant_id": null,
        "product_id": 5998816854173,
        "tags": ["-auto-color-black:black", "-auto-color-gray:gray", "-auto-condition-new", "-auto-condition-used", "-auto-size-l", "-auto-size-xl-(waist-40-43)", "Bottoms", "Insulated", "Men's", "Outerwear", "Pants", "Skiing & Snowboarding", "Snow Pants", "Synthetic Insulation", "Waterproof"],
        "title": "Men's Snow Gun Pants",
        "url_slug": "mens-snow-gun-pants",
        "variants": [{"msrp": 110.0, "price": 50.0, "sku": "6180602312d880dde9fc33b1", "variant_id": 41366392537245}, {"msrp": 110.0, "price": 89.95, "sku": "v1-112510687227-0", "variant_id": 41366392570013}]
    }, {
        "brand": "Columbia",
        "collection_ids": [233987178653, 233987211421, 235833098397, 236153503901, 236939051165, 265040527517, 278696689821, 281905430685, 281905725597, 283963293853, 283965685917, 283965751453, 283965849757, 284054814877, 284278522013, 284279013533, 284279505053, 284280127645, 284405858461],
        "images": [{"url": "//cdn.shopify.com/s/files/1/0412/7840/6813/products/mens-bugaboo-iv-pants-1.jpg?v=1611279907"}, {"url": "//cdn.shopify.com/s/files/1/0412/7840/6813/products/mens-bugaboo-iv-pants-2.jpg?v=1611279907"}, {"url": "//cdn.shopify.com/s/files/1/0412/7840/6813/products/mens-bugaboo-iv-pants-3.jpg?v=1611279907"}, {"url": "//cdn.shopify.com/s/files/1/0412/7840/6813/products/mens-bugaboo-iv-pants-4.jpg?v=1611279907"}, {"url": "//cdn.shopify.com/s/files/1/0412/7840/6813/products/mens-bugaboo-iv-pants-5.jpg?v=1611279907"}, {"url": "//cdn.shopify.com/s/files/1/0412/7840/6813/products/mens-bugaboo-iv-pants-6.jpg?v=1611279907"}, {"url": "//cdn.shopify.com/s/files/1/0412/7840/6813/products/mens-bugaboo-iv-pants-7.jpg?v=1611279907"}, {"url": "//cdn.shopify.com/s/files/1/0412/7840/6813/products/mens-bugaboo-iv-pants-8.jpg?v=1611279907"}],
        "metafields": [{"key": "brand_sku", "value": "1864311", "value_type": "String"}, {"key": "brand_image_source", "value": "Columbia", "value_type": "String"}, {
            "key": "brand_image_url",
            "value": "<a href=\"https://www.columbia.com/p/mens-bugaboo-iv-pants-1864311.html\">https://www.columbia.com/p/mens-bugaboo-iv-pants-1864311.html</a>",
            "value_type": "String"
        }, {"key": "google_product_category", "value": "187", "value_type": "String"}],
        "options": {"color": "black:#28282e", "site_and_condition": "Columbia:new", "size": "l"},
        "presented_variant_id": null,
        "product_id": 5998815969437,
        "tags": ["-auto-color-black:#28282e", "-auto-color-dark-grey:#797375", "-auto-color-grey:grey", "-auto-color-light-blue:#3f82cf", "-auto-color-navy:#254969", "-auto-color-red:red", "-auto-condition-new", "-auto-size-l", "-auto-size-m", "-auto-size-s", "-auto-size-xl", "-auto-size-xxl", "-auto-size2-r", "Bottoms", "Breathable", "Insulated", "Men's", "OMNI-HEAT\u00e2\u0084\u00a2", "OMNI-TECH\u00e2\u0084\u00a2", "Outerwear", "Pants", "Shells", "Skiing & Snowboarding", "Snow Pants", "Synthetic Insulation", "Waterproof"],
        "title": "Men's Bugaboo IV Snow Pants",
        "url_slug": "mens-bugaboo-iv-snow-pants",
        "variants": [{"msrp": 110.0, "price": 110.0, "sku": "1864311", "variant_id": 40709596774557}, {"msrp": 110.0, "price": 110.0, "sku": "1864311", "variant_id": 40709596807325}, {
            "msrp": 110.0,
            "price": 110.0,
            "sku": "1864311",
            "variant_id": 40709596840093
        }, {"msrp": 110.0, "price": 110.0, "sku": "1864311", "variant_id": 40709596872861}, {"msrp": 110.0, "price": 110.0, "sku": "1864311", "variant_id": 40709596905629}, {
            "msrp": 110.0,
            "price": 110.0,
            "sku": "1864311",
            "variant_id": 40709596938397
        }, {"msrp": 110.0, "price": 110.0, "sku": "1864311", "variant_id": 40709596971165}, {"msrp": 110.0, "price": 110.0, "sku": "1864311", "variant_id": 40709597003933}, {
            "msrp": 110.0,
            "price": 110.0,
            "sku": "1864311",
            "variant_id": 40709597036701
        }, {"msrp": 110.0, "price": 110.0, "sku": "1864311", "variant_id": 40709597069469}, {"msrp": 110.0, "price": 110.0, "sku": "1864311", "variant_id": 40709597102237}, {
            "msrp": 110.0,
            "price": 110.0,
            "sku": "1864311",
            "variant_id": 40709597135005
        }, {"msrp": 110.0, "price": 110.0, "sku": "1864311", "variant_id": 40709597167773}, {"msrp": 110.0, "price": 110.0, "sku": "1864311", "variant_id": 40709597200541}, {
            "msrp": 110.0,
            "price": 110.0,
            "sku": "1864311",
            "variant_id": 40709597233309
        }, {"msrp": 110.0, "price": 110.0, "sku": "1864311", "variant_id": 40709597266077}, {"msrp": 110.0, "price": 110.0, "sku": "1864311", "variant_id": 40709597298845}, {
            "msrp": 110.0,
            "price": 110.0,
            "sku": "1864311",
            "variant_id": 40709597331613
        }, {"msrp": 110.0, "price": 110.0, "sku": "1864311", "variant_id": 40709597364381}, {"msrp": 110.0, "price": 110.0, "sku": "1864311", "variant_id": 40709597397149}, {
            "msrp": 110.0,
            "price": 110.0,
            "sku": "1864311",
            "variant_id": 40709597429917
        }, {"msrp": 110.0, "price": 110.0, "sku": "1864311", "variant_id": 40709597462685}, {"msrp": 110.0, "price": 110.0, "sku": "1864311", "variant_id": 40709597495453}, {
            "msrp": 110.0,
            "price": 110.0,
            "sku": "1864311",
            "variant_id": 40709597528221
        }, {"msrp": 110.0, "price": 110.0, "sku": "1864311", "variant_id": 40709597560989}, {"msrp": 110.0, "price": 110.0, "sku": "1864311", "variant_id": 40709597593757}, {
            "msrp": 110.0,
            "price": 110.0,
            "sku": "1864311",
            "variant_id": 40709597626525
        }, {"msrp": 110.0, "price": 110.0, "sku": "1864311", "variant_id": 40709597659293}, {"msrp": 110.0, "price": 110.0, "sku": "1864311", "variant_id": 40709597692061}, {
            "msrp": 110.0,
            "price": 110.0,
            "sku": "1864311",
            "variant_id": 40709597724829
        }]
    }, {
        "brand": "Marmot",
        "collection_ids": [233987178653, 233987211421, 235833098397, 236153503901, 236939051165, 265040527517, 278696689821, 281905627293, 281905725597, 283963293853, 283965685917, 283965751453, 283965849757, 284054814877, 284278522013, 284279013533, 284279505053, 284280127645, 284405858461],
        "images": [{"url": "//cdn.shopify.com/s/files/1/0412/7840/6813/products/motion-insulated-pants-mens-1.jpg?v=1611276695"}],
        "metafields": [{"key": "brand_sku", "value": "854734", "value_type": "String"}, {"key": "brand_image_source", "value": "REI", "value_type": "String"}, {
            "key": "brand_image_url",
            "value": "<a href=\"https://www.rei.com/product/854734/marmot-motion-insulated-pants-mens\">https://www.rei.com/product/854734/marmot-motion-insulated-pants-mens</a>",
            "value_type": "String"
        }, {"key": "google_product_category", "value": "5322", "value_type": "String"}],
        "options": {"color": "gray:gray", "site_and_condition": "Poshmark:used", "size": "s"},
        "presented_variant_id": null,
        "product_id": 5998738669725,
        "tags": ["-auto-color-gray:gray", "-auto-condition-used", "-auto-size-s", "Bottoms", "Breathable", "Insulated", "Marmot MemBrain\u00c2\u00ae", "Men's", "Outerwear", "Pants", "Skiing & Snowboarding", "Snow Pants", "Synthetic Insulation", "Waterproof"],
        "title": "Men's Motion Insulated Snow Pants",
        "url_slug": "mens-motion-insulated-snow-pants",
        "variants": [{"msrp": 165.0, "price": 135.0, "sku": "6118081f045e39695e426c1c", "variant_id": 41366704652445}]
    }, {
        "brand": "Mountain Hardwear",
        "collection_ids": [233987178653, 233987211421, 235833098397, 236153503901, 236939051165, 265040527517, 278696689821, 281905463453, 281905725597, 283963293853, 283965685917, 283965751453, 283965849757, 284054814877, 284278522013, 284279013533, 284279505053, 284280127645, 284405858461],
        "images": [{"url": "//cdn.shopify.com/s/files/1/0412/7840/6813/products/Men_sCloudBankGaoGore-Tex-_InsulatedPant1.jpg?v=1632442310"}, {"url": "//cdn.shopify.com/s/files/1/0412/7840/6813/products/Men_sCloudBankGaoGore-Tex-_InsulatedPant2.jpg?v=1632442310"}, {"url": "//cdn.shopify.com/s/files/1/0412/7840/6813/products/Men_sCloudBankGaoGore-Tex-_InsulatedPant3.jpg?v=1632442311"}, {"url": "//cdn.shopify.com/s/files/1/0412/7840/6813/products/Men_sCloudBankGaoGore-Tex-_InsulatedPant4.jpg?v=1632442311"}, {"url": "//cdn.shopify.com/s/files/1/0412/7840/6813/products/Men_sCloudBankGaoGore-Tex-_InsulatedPant5.jpg?v=1632442311"}, {"url": "//cdn.shopify.com/s/files/1/0412/7840/6813/products/Men_sCloudBankGaoGore-Tex-_InsulatedPant6.jpg?v=1632442311"}, {"url": "//cdn.shopify.com/s/files/1/0412/7840/6813/products/Men_sCloudBankGaoGore-Tex-_InsulatedPant7.jpg?v=1632442311"}],
        "metafields": [{"key": "brand_sku", "value": "1858591_S", "value_type": "String"}, {"key": "brand_image_source", "value": "Mountain Hardwear", "value_type": "String"}, {
            "key": "brand_image_url",
            "value": "<a href=\"https://www.mountainhardwear.com/p/cloud-bank-gore-tex-insulate-%7C-353-%7C-xl-888663230473.html\">https://www.mountainhardwear.com/p/cloud-bank-gore-tex-insulate-%7C-353-%7C-xl-888663230473.html</a>",
            "value_type": "String"
        }, {"key": "google_product_category", "value": "203", "value_type": "String"}],
        "options": {"color": "purple:purple", "site_and_condition": "Poshmark:new", "size": "m"},
        "presented_variant_id": null,
        "product_id": 5998710947997,
        "tags": ["-auto-color-purple:purple", "-auto-condition-new", "-auto-size-m", "Bottoms", "Breathable", "GORE-TEX\u00c2\u00ae", "Insulated", "Men's", "Outerwear", "Pants", "RECCO\u00c2\u00ae", "Shells", "Skiing & Snowboarding", "Snow Pants", "Synthetic Insulation", "Waterproof", "Windproof"],
        "title": "Men's Cloud Bank GORE-TEX Insulated Pants",
        "url_slug": "mens-cloud-bank-gore-tex-insulated-pants",
        "variants": [{"msrp": 350.0, "price": 165.0, "sku": "614e45cb284e99be500f48e8", "variant_id": 41366795223197}]
    }, {
        "brand": "Mountain Hardwear",
        "collection_ids": [233987178653, 233987211421, 235833098397, 236153503901, 236939051165, 265040527517, 278696689821, 281905463453, 281905725597, 283963293853, 283965685917, 283965751453, 283965849757, 284054814877, 284278522013, 284279013533, 284279505053, 284280127645, 284405858461],
        "images": [{"url": "//cdn.shopify.com/s/files/1/0412/7840/6813/products/highball-insulated-pants-mens-1.jpg?v=1611274919"}],
        "metafields": [{"key": "brand_sku", "value": "160302", "value_type": "String"}, {"key": "brand_image_source", "value": "REI", "value_type": "String"}, {
            "key": "brand_image_url",
            "value": "<a href=\"https://www.rei.com/rei-garage/product/160302/mountain-hardwear-highball-insulated-pants-mens\">https://www.rei.com/rei-garage/product/160302/mountain-hardwear-highball-insulated-pants-mens</a>",
            "value_type": "String"
        }],
        "options": {"color": "blue:blue", "site_and_condition": "eBay:new", "size": "m"},
        "presented_variant_id": null,
        "product_id": 5998707212445,
        "tags": ["-auto-color-blue:blue", "-auto-condition-new", "-auto-size-m", "Bottoms", "Breathable", "Insulated", "Men's", "Outerwear", "Pants", "RECCO\u00c2\u00ae", "Skiing & Snowboarding", "Snow Pants", "Synthetic Insulation", "Waterproof"],
        "title": "Men's Highball Insulated Pants",
        "url_slug": "mens-highball-insulated-pants",
        "variants": [{"msrp": 280.0, "price": 99.0, "sku": "v1-164731149099-0", "variant_id": 41366740238493}]
    }]
}


function App() {
    const questions = [..._data]

    const getQuestionByPathway = (pathway) => {
        return questions.find((q) => q.pathway === pathway)
    }

    const [currentPathway, setCurrentPathway] = useState(questions[0].pathway);
    const [currentQuestion, setCurrentQuestion] = useState(getQuestionByPathway(currentPathway));
    const [answers, setAnswers] = useState([]);
    const [resultsData, setResultsData] = useState(null);
    const [filterResults, filterResultsSetState] = useState(null);
    const [refinedProducts, refinedProductsSetState] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const handleNextQuestion = (newAnswers) => {
        setCurrentPathway(newAnswers[0].nextPathway)
        setCurrentQuestion(getQuestionByPathway(newAnswers[0].nextPathway))
        setAnswers([...answers, ...newAnswers])
    }


    const getAllRules = () => {
        let rules = [];

        answers.forEach((a) => {
            rules = [...rules, ...a.rules]
        })
        return rules;
    }


    const getExpression = ({command, type = 'TAG', withTypeCommand = '', removeAngles = false}) => {
        const rules = getAllRules();

        const getTagsByJoinCommand = () => {
            return rules.filter((i) => i.type === type && i.command === command)
        }

        const getExpression = () => {
            const tagsByCommand = getTagsByJoinCommand()
            let expression = '';
            const lastPosition = tagsByCommand.length - 1;
            tagsByCommand.map(({join, variable}, idx) => {
                if (removeAngles) {
                    return expression = `${expression} ${withTypeCommand}(<${variable.replace('<', '').replace('>', '').trim()}>) ${idx === lastPosition ? '' : join.toLocaleLowerCase()}`

                }
                expression = `${expression} ${withTypeCommand}(<${variable}>) ${idx === lastPosition ? '' : join.toLocaleLowerCase()}`
            })

            return expression.trim()
        }

        return getExpression()
    }


    const fetchResults = async () => {
        setIsLoading(true)

        const includeTagsExpression = getExpression({command: 'INCLUDE', withTypeCommand: 'with_tag'})
        const excludeTagsExpression = getExpression({command: 'EXCLUDE', withTypeCommand: 'with_tag'})

        const includeSizeExpression = getExpression({command: 'INCLUDE', type: 'VARIANT OPTION_SIZE', withTypeCommand: 'with_size'})
        const excludeSizeExpression = getExpression({command: 'EXCLUDE', type: 'VARIANT OPTION_SIZE', withTypeCommand: 'with_size'})

        const includeConditionExpression = getExpression({command: 'INCLUDE', type: 'VARIANT OPTION_CONDITION', withTypeCommand: 'with_condition'})
        const excludeConditionExpression = getExpression({command: 'EXCLUDE', type: 'VARIANT OPTION_CONDITION', withTypeCommand: 'with_condition'})

        const boostTagExpression = getExpression({command: 'BOOST', withTypeCommand: 'with_tag'})

        const boostPriceExpression = getExpression({command: 'BOOST', type: 'PRICE', withTypeCommand: 'is_lessthan_price', removeAngles: true})
        const boostComparePriceExpression = getExpression({command: 'BOOST', type: 'COMPARE AT PRICE', withTypeCommand: 'is_greaterthan_price', removeAngles: true})


        const addArrayItem = (command, type, expression) => {
            const obj = {
                command,
                type,
                expression
            }
            return (!!expression ? [obj] : [])
        }

        const payload = [
            ...addArrayItem("INCLUDE",  'TAG',                      includeTagsExpression),
            ...addArrayItem("INCLUDE",  "VARIANT OPTION_SIZE",      includeSizeExpression),
            ...addArrayItem("INCLUDE",  "VARIANT OPTION_CONDITION", includeConditionExpression),
            ...addArrayItem("BOOST",    "TAG",                      boostTagExpression),
            ...addArrayItem("BOOST",    "VARIANT OPTION_COLOR", ""),
            ...addArrayItem("BOOST",    "PRICE",                    boostPriceExpression),
            ...addArrayItem("BOOST",    "COMPARE AT PRICE",         boostComparePriceExpression)
        ]
        try {
            const {data} = await getResults({ "rules":payload });
            setResultsData(data)
        } catch (e) {
            setIsLoading(false)
        }

    }

    useEffect(() => {
        if (currentPathway === 'results') {
            fetchResults()
        }
    }, [currentPathway])

    useEffect(() => {
        if (resultsData !== null) {
            filterResultsSetState(
                filterResultsFunc(resultsData)
            )
        }
    }, [filterResultsFunc, resultsData])

    const fetchResultsAwait = async () => {
        try {
            const {data} = await productFetch(filterResults)
            refinedProductsSetState(data.products);
            setIsLoading(false)
        } catch (e) {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (filterResults !== null) {
            fetchResultsAwait()
        }
    }, [productFetch, filterResults])

    const getContent = () => {
        if (currentPathway === 'results') return <Result data={refinedProducts} isLoading={isLoading}/>;
        if (currentQuestion) return <Step {...currentQuestion} onNextQuestion={handleNextQuestion}/>;
        return (
            <TextBridge>
                <br/>
                No following question so far
                <br/><br/><br/>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                        window.location.reload()
                    }}
                    endIcon={<ReplayIcon/>}>
                    Reload
                </Button>
            </TextBridge>
        )
    }

    return (
        <div className='Wizard__Container'>
            {getContent()}
        </div>
    );
}

export default App;